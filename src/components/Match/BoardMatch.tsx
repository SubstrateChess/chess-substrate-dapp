import * as React from 'react';
import {Chess, Move} from "chess.js";
import { ApiPromise } from "@polkadot/api";
import { EventRecord } from "@polkadot/types/interfaces";
import { Chessboard } from "react-chessboard";
import DotLoader from "react-spinners/ClipLoader";
import { Button } from '../../ui/Button';
import { Modal } from '../../ui/Modal';
import { Match } from '../../types/chessTypes';
import { boardOrientation, getPieceColor, getPieceType, isMyPiece, isMyTurn, matchHasStarted, statusMsg, displayErrorExtrinsic } from './boardHelper';
import { displayError, displayMessage, displaySuccess } from '../../utils/messages';
import { useApi } from '../../contexts/apiProvider';
import { abandon_match, abort_match, make_move } from '../../chain/game';
import { SigningAccount } from '../../types/walletTypes';
import { Square } from 'react-chessboard/dist/chessboard/types';
import { getMatch } from '../../chain/matches';
import { ExtrinsicResult } from '../../types/apiTypes';

interface MatchProps{
  game: Match;
  matches: Match[];
  myAccount: SigningAccount;
  setGameOnGoing: (gameOnGoing: boolean) => void;
  showMatches: (isShowingMatches: boolean) => void;
}
export const BoardMatch = (props: MatchProps) => {
  const [game, setGame] = React.useState(new Chess());
  const [fen, setFen] = React.useState(game.fen());
  const [movePiece, setMovePiece] = React.useState("");
  const [statusMessage, setStatusMessage] = React.useState("");
  const [matchInfo, setMatchInfo] = React.useState<Match>(props.game);
  const [visible, setVisible] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const { api } = useApi();
  let initialized = false;


  React.useEffect(() => {
    if (!initialized) {
      initialized = true
      const chess = new Chess();
      chess.load(matchInfo.match.board);
      setGame(chess);
      setFen(matchInfo.match.board);
      setStatusMessage(statusMsg(matchInfo.match, props.myAccount.account.address));
      if (api){
        queryEvents(api);
      }
    }
    
  }, []);

  React.useEffect(() => {
    async function move() {
      if (movePiece !== ""){
        await performMove();
        setMovePiece("");
      }
    }
    move();
  }, [movePiece !== ""]);

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
    setGame(game);
    setFen(game.fen());
    if (api){
      const refresh_match = await getMatch(api, matchInfo.match_id);
      if(refresh_match){
        setMatchInfo(refresh_match);
        const chess = new Chess();
        chess.load(refresh_match.match.board);
        setGame(chess);
        setFen(refresh_match.match.board);
        setStatusMessage(statusMsg(refresh_match.match, props.myAccount.account.address));
      }
      else{
        displayMessage("Game Over");
        props.setGameOnGoing(false);
        props.showMatches(false);
      }
    }
  }

  const performMove = async () => {
    try{
      if(api){
        await make_move(api, props.myAccount, props.game.match_id, movePiece,  async (result) => {
          await updateMatch();
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
  


 function onDrop(sourceSquare: Square, targetSquare: Square, piece: string)  {
    if(!isMyPiece(matchInfo.match, props.myAccount.account.address, getPieceColor(piece))) {
      displayError("You can't move you opponent pieces");
      return false;
    }
    if(isMyTurn(matchInfo.match, props.myAccount.account.address)){
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
            }
            setGame(gameCopy);
            setMovePiece(sourceSquare.toString() + targetSquare.toString());
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
               if (event.data[1].toString() != props.myAccount.account.address) {
                //TODO: If I lose dont update the match
                displayMessage("The opponent made a move.");
                updateMatch();
               }
            }
            else if(event.method === 'MatchAborted'){
              displayMessage("Match Aborted!");
            }
            else if(event.method === 'MatchWon'){
              if (event.data[1].toString() != props.myAccount.account.address) {
                displayError("Match finish, you lost!");
                setStatusMessage("You lost!");
                props.showMatches(false);
              }
              else {
                displaySuccess("Match finish, you won!");
                setStatusMessage("Congratulations, You won!");
              }
              props.setGameOnGoing(false);
            }
            else if(event.method === 'MatchDrawn'){
              displayMessage("Match finish, drawn!");
              setStatusMessage("Drawn");
              props.setGameOnGoing(false);
            }
        }
        });
    });
}

  return (
    <>
      <span className="text-h5 font-semibolds">
        Status: {statusMessage}
      </span>
      
      <div className="text-center text-body">
        <div className="flex flex-col w-full items-center gap-2 px-4 lg:gap-4 lg:px-0">
        <Modal open={visible} onClose={() => closeModal()}>
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
          <Chessboard id="chessBoard" position={fen} onPieceDrop={onDrop} 
            boardWidth={480}
            boardOrientation={boardOrientation(matchInfo.match, props.myAccount.account.address)} 
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
