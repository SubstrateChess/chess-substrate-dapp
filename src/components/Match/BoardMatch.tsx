import * as React from 'react';
import {Chess, Move} from "chess.js";
import { ApiPromise } from "@polkadot/api";
import { EventRecord } from "@polkadot/types/interfaces";
import { Chessboard } from "react-chessboard";
import DotLoader from "react-spinners/ClipLoader";
import { Button } from '../../ui/Button';
import { Modal } from '../../ui/Modal';
import { Match, MatchState } from '../../types/chessTypes';
import { boardOrientation, getPieceColor, getPieceType, isMyPiece, isMyTurn, matchHasStarted, statusMsg, displayErrorExtrinsic, changeTurn } from './boardHelper';
import { displayError, displayMessage, displaySuccess } from '../../utils/messages';
import { useApi } from '../../contexts/apiProvider';
import { abandon_match, abort_match, make_move } from '../../chain/game';
import { SigningAccount } from '../../types/walletTypes';
import { Square } from 'react-chessboard/dist/chessboard/types';
import { getMatch } from '../../chain/matches';
import { ExtrinsicResult } from '../../types/apiTypes';
import { formatAddressToChain } from '../../utils/accounts';

const SECONDS_TO_WAIT_SINCE_EVENT_TRIGGERED = 15000;
interface MatchProps{
  game: Match;
  matches: Match[];
  myAccount: SigningAccount;
  setGameOnGoing: (gameOnGoing: boolean) => void;
  showMatches: (isShowingMatches: boolean) => void;
}
export const BoardMatch = (props: MatchProps) => {
  const [game, setGame] = React.useState(new Chess());
  const [status, setStatus] = React.useState<MatchState>(props.game.match.state);
  const [matchInfo, setMatchInfo] = React.useState<Match>(props.game);

  const [isModalVisible, setVisible] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const { api } = useApi();
  let initialized = false;


  React.useEffect(() => {
    if (!initialized) {
      initialized = true
      const chess = new Chess();
      chess.load(matchInfo.match.board);
      setGame(chess);
      if (api){
        queryEvents(api);
      }
    }
    
  }, []);

  const closeModal = () => {
    setVisible(false);
  };

  const openModal = () => {
    setVisible(true);
  };

  const finishGame = async () => {
    if (api){
      if(matchHasStarted(matchInfo.match)){
        setLoading(true);
        // Abandom game and lose
        await abandon_match(api, props.myAccount, props.game.match_id,  (result: ExtrinsicResult) => {
          displayErrorExtrinsic(result);
          setLoading(false);
          props.setGameOnGoing(false);
          props.showMatches(false);
        });
      }
      else {
        setLoading(true);
        // Abort game
        await abort_match(api, props.myAccount, props.game.match_id,  (result: ExtrinsicResult) => {
          displayErrorExtrinsic(result);
          setLoading(false);
          props.setGameOnGoing(false);
          props.showMatches(false);
        });
      }
    }
  }

  const updateMatch = async () => {
    //TODO: Check if can be less and message not showing
    await sleep(SECONDS_TO_WAIT_SINCE_EVENT_TRIGGERED);
    displayMessage("The opponent made a move.");
    if (api){
      const refresh_match = await getMatch(api, matchInfo.match_id);
      if(refresh_match){
        setMatchInfo(refresh_match);
        const chess = new Chess();
        chess.load(refresh_match.match.board);
        setGame(chess);
        setStatus(refresh_match.match.state);
      }
      else{
        displayMessage("Game Over");
        props.setGameOnGoing(false);
        props.showMatches(false);
      }
    }
  }

  const performMove = async (movePiece: string) => {
    try{
      if(api){
        await make_move(api, props.myAccount, props.game.match_id, movePiece,  async (result) => {
          if(!result.success){
            displayError("Error executing the extrinsic: " + result.message);
            await updateMatch();
            return false;
          }
          return true;
        });
      }
      else{
        displayError("Not connected.");
        return false;
      }
    }
    catch(e){
      displayError("Error performing move with the pallet.");
      return false;
    }
  }


  const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));


 function onDrop(sourceSquare: Square, targetSquare: Square, piece: string)  {
    if(!isMyPiece(matchInfo.match, formatAddressToChain(props.myAccount.account.address), getPieceColor(piece))) {
      displayError("You can't move you opponent pieces");
      return false;
    }
    if(isMyTurn(matchInfo.match, status, formatAddressToChain(props.myAccount.account.address))){
      const gameCopy: Chess = game;
      const m: Move = {
        color: getPieceColor(piece),
        flags: '',
        piece: getPieceType(piece),
        san: '',
        from: sourceSquare,
        to: targetSquare,
        lan: '',
        before: '',
        after: ''
      };
      try {
          const move = gameCopy.move(m);
          if(move === null) {
            displayError("Invalid move");
            return false;
          }
          else{
            if(gameCopy.isCheckmate()){
              displaySuccess("Checkmate, you won!");
              setStatus('Won');
            }
            else if(gameCopy.isDraw()){
              displayMessage("Draw");
              setStatus('Drawn');
            }
            else {
              setStatus(changeTurn(matchInfo.match, status, formatAddressToChain(props.myAccount.account.address)));
            }
            gameCopy.load(gameCopy.fen());
            setGame(gameCopy);
            //Make it async?
            performMove(sourceSquare.toString() + targetSquare.toString());
            return true;
          }
        }
        catch(error){
          displayError("Invalid move");
        }
      }
        else {
          displayError("Not your turn to move");
          return false;
        } 
  }

  function queryEvents(api: ApiPromise): void {
    api.query.system.events((events: any) => {
        // Loop through the Vec<EventRecord>
        events.forEach((record: EventRecord) => {
        // Extract the phase, event and the event types
        const { event } = record;
        // For the following events the first parameter is the hash of the match, check that is from this match
        if (event.section === 'chess' && event.data[0].toString() === props.game.match_id.toString()) {
            if(event.method === 'MatchStarted'){
              updateMatch();
            }
            else if(event.method === 'MoveExecuted'){
               // Update match in case who make the extrinsic is the oponent
               if (event.data[1].toString() != formatAddressToChain(props.myAccount.account.address)) {
                // TODO: Check if the move ends the match and not update it event.data[2].toHuman()
                updateMatch();
               }
            }
            else if(event.method === 'MatchAborted'){
              displayMessage("Match Aborted!");
            }
            else if(event.method === 'MatchWon'){
              if (event.data[1].toString() != formatAddressToChain(props.myAccount.account.address)) {
                displayError("Match finish, you lost!");
                setStatus("Lost");
                props.showMatches(false);
              }
              else {
                displaySuccess("Match finish, you won!");
                setStatus("Won");
              }
              props.setGameOnGoing(false);
            }
            else if(event.method === 'MatchDrawn'){
              displayMessage("Match finish, drawn!");
              setStatus("Drawn");
              props.setGameOnGoing(false);
            }
        }
        });
    });
}

  return (
    <>
      <span className="text-h5 font-semibolds">
        Status: {statusMsg(matchInfo.match, status, formatAddressToChain(props.myAccount.account.address))}
      </span>
      
      <div className="text-center text-body">
        <div className="flex flex-col w-full items-center gap-2 px-4 lg:gap-4 lg:px-0">
        <Modal open={isModalVisible} onClose={() => closeModal()}>
            {loading &&
            <div className="flex flex-col content-between space-y-4 items-center justify-center max-h-[90vh] px-1 py-2">
              <DotLoader color="#e6007a" size={100}/>
              <span className="text-h6 font-semibold">Loading...</span>
            </div>
          }
          {!loading &&
            <div className="flex flex-col content-between space-y-4 items-center justify-center max-h-[90vh] px-1 py-2">
                <p>Are you sure you want to finish the game?</p>
                <Button onClick={finishGame}>
                  {matchHasStarted(matchInfo.match) ? "Abandon Game" : "Abort Game"}
                </Button>
            </div>
          }
          
        </Modal>
          <Chessboard id="chessBoard" position={game.fen()} onPieceDrop={onDrop} 
            boardWidth={480}
            boardOrientation={boardOrientation(matchInfo.match, formatAddressToChain(props.myAccount.account.address))} 
            customBoardStyle={{
            borderRadius: "4px",
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.5)",
          }}/>
          
        </div>
      </div>
      <Button onClick={openModal}>
            {matchHasStarted(matchInfo.match) ? "Abandon Game" : "Abort Game"}
      </Button>
      <br />
    </>
  );
}
