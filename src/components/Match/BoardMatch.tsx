import * as React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import {Chess, ChessInstance, Move} from "chess.js";
import { Chessboard } from "react-chessboard";
import { Button } from '../../ui/Button';
import { Match } from '../../types/chessTypes';
import { boardOrientation, getPieceColor, getPieceType, isMyPiece, isMyTurn, matchHasStarted, statusMsg } from './boardHelper';
import { displayError, displayMessage } from '../../utils/errors';
import { useApi } from '../../contexts/apiProvider';
import { abandon_match, abort_match, make_move } from '../../chain/game';
import { SigningAccount } from 'src/types/walletTypes';
import { Square } from 'react-chessboard/dist/chessboard/types';
import { getMatch } from '../../chain/matches';

interface MatchProps{
  game: Match;
  myAccount: SigningAccount;
  setGameOnGoing: (gameOnGoing: boolean) => void;
}
export const BoardMatch = (props: MatchProps) => {
  const [game, setGame] = React.useState(new Chess());
  const [fen, setFen] = React.useState(game.fen());
  const [movePiece, setMovePiece] = React.useState("");
  const [statusMessage, setStatusMessage] = React.useState("");
  const [matchInfo, setMatchInfo] = React.useState<Match>(props.game);

  const { api } = useApi();


  React.useEffect(() => {
    const chess = new Chess();
    chess.load(matchInfo.match.board);
    setGame(chess);
    setFen(matchInfo.match.board);
    setStatusMessage(statusMsg(matchInfo.match, props.myAccount.account.address));
  }, []);

  React.useEffect(() => {
    async function move() {
      if (movePiece !== ""){
        await performMove(game);
        setMovePiece("");
      }
    }
    move();
  }, [movePiece !== ""]);

  const finishGame = async () => {
    if (api){
      if(matchHasStarted(matchInfo.match)){
        // Abandom game and lose
        await abandon_match(api, props.myAccount, props.game.match_id,  (result) => {
          console.log(result);
          displayMessage("You have lost by abandon");
          props.setGameOnGoing(false);
        });
      }
      else {
        // Abort game
        await abort_match(api, props.myAccount, props.game.match_id,  (result) => {
          displayMessage("Match aborted successfully");
          props.setGameOnGoing(false);
        });
      }
    }
  }
  const updateMatch = async () => {
    setGame(game);
    setFen(game.fen());
    if (api){
      const refresh_match = await getMatch(api, matchInfo.match_id);
      setMatchInfo(refresh_match);
    }
  }
  const performMove = async (game: ChessInstance) => {
    try{
      if(api){
        await make_move(api, props.myAccount, props.game.match_id, movePiece,  async (result) => {
          await updateMatch();
          //setStatusMessage(statusMsg(match, props.myAccount.account.address));
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
      const gameCopy = { ...game };
      const m: Move = {
        color: getPieceColor(piece),
        flags: '',
        piece: getPieceType(piece),
        san: '',
        from: sourceSquare,
        to: targetSquare,
      };
      const move = gameCopy.move(m);
      if(move === null) {
        displayError("Invalid move");
        return false;
      }
      else{
        setGame(gameCopy);
        setMovePiece(sourceSquare.toString() + targetSquare.toString());
        return true;
      }
    }
    else {
      displayError("Not your turn to move");
      return false;
    }
  }

  return (
    <>
      <div className="flex flex-col gap-4 md:w-[480px]">
      <span className="px-2 text-center text-body">
        {statusMessage}
      </span>
       <Chessboard id="chessBoard" position={fen} onPieceDrop={onDrop} 
          boardOrientation={boardOrientation(matchInfo.match, props.myAccount.account.address)} 
          customBoardStyle={{
          borderRadius: "4px",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.5)",
        }}/>
    </div>
    <br />
    <div className="flex items-center gap-4 px-4 lg:gap-8 lg:px-0">
      <Button onClick={finishGame}>
        {matchHasStarted(matchInfo.match) ? "Abandon Game" : "Abort Game"}
      </Button>
    </div>
    </>
  );
}
