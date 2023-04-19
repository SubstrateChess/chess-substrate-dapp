import * as React from 'react';
import {Chess, ChessInstance, Move, Piece, Square} from "chess.js";
import { Chessboard } from "react-chessboard";
import { Button } from '../../ui/Button';
import { Match } from '../../types/chessTypes';
import { boardOrientation, isMyTurn, matchHasStarted, statusMsg } from './boardHelper';
import { displayError } from '../../utils/errors';
import { useApi } from '../../contexts/apiProvider';
import { make_move } from '../../chain/game';
import { SigningAccount } from 'src/types/walletTypes';

interface MatchProps{
  game: Match;
  myAccount: SigningAccount;
}
export const BoardMatch = (props: MatchProps) => {
  const [game, setGame] = React.useState(new Chess());
  const [fen, setFen] = React.useState(game.fen());
  const [movePiece, setMovePiece] = React.useState("");
  const { api } = useApi();
  
  const match = props.game.match;

  React.useEffect(() => {
    const chess = new Chess();
    chess.load(match.board);
    setGame(chess);
    setFen(match.board);
    console.log(chess.turn());
    
    
  }, []);

  React.useEffect(() => {
    async function move() {
      if (movePiece !== ""){
        console.log("is move ok");
        console.log(game.fen());
        await performMove(game);
        setMovePiece("");
      }
    }
    move();
  }, [movePiece !== ""]);

  const finishGame = () => {
    if(matchHasStarted(match)){
      console.log("abandom game");
    }
    else {
      console.log("abort game");
    }
  }
  const performMove = async (game: ChessInstance) => {
    try{
      if(api){
        await make_move(api, props.myAccount, props.game.match_id, movePiece,  (result) => {
          setGame(game);
          setFen(game.fen());
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
  


 function onDrop(sourceSquare: Square, targetSquare: Square, piece: Piece)  {
    if(isMyTurn(match, props.myAccount.account.address)){
      const gameCopy = { ...game };
      console.log(sourceSquare);
      console.log(targetSquare);
      const m: Move = {
        color: piece.color,
        flags: '',
        piece: piece.type,
        san: '',
        from: sourceSquare,
        to: targetSquare,
      };
      const move = gameCopy.move(m);
      console.log(move);
      //TODO: Invalid move if the piece.color is not mine
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

   //TODO: Update status after move
  return (
    <>
      <div className="flex flex-col gap-4 md:w-[480px]">
      <span className="px-2 text-center text-body">
        {statusMsg(match, props.myAccount.account.address)}
      </span>
       <Chessboard id="chessBoard" position={fen} onPieceDrop={onDrop} 
          boardOrientation={boardOrientation(match, props.myAccount.account.address)} 
          customBoardStyle={{
          borderRadius: "4px",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.5)",
        }}/>
    </div>
    <br />
    <div className="flex items-center gap-4 px-4 lg:gap-8 lg:px-0">
      <Button onClick={finishGame}>
        {matchHasStarted(match) ? "Abort Game" : "Abandon Game"}
      </Button>
    </div>
    </>
  );
}
