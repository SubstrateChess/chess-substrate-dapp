import * as React from 'react';
import {Chess} from "chess.js";
import { Chessboard } from "react-chessboard";

export const Game = () => {
  const [game, setGame] = React.useState(new Chess());
  const [fen, setFen] = React.useState(game.fen());

  // React.useEffect(() => {
  //   console.log("here");
  //   setGame(new Chess());
  // }, [game]);
  
  function makeAMove(move) {
    const gameCopy = game;
    try{
      const result = gameCopy.move(move);
      setGame(gameCopy);
      setFen(game.fen());
      return result; // null if the move was illegal, the move object if the move was legal
    }
    catch(e){
      console.log(e);
      return null;
    }
  }


  function onDrop(sourceSquare, targetSquare) {
    const move = makeAMove({
      from: sourceSquare,
      to: targetSquare,
      promotion: "q", // always promote to a queen for example simplicity
    });
    console.log("move");
    console.log(move);

    // illegal move
    if (move === null) return false;
    return true;
  }
  
  return (
      <div className="flex w-full flex-col gap-2 md:w-[460px]">
       <Chessboard id="chessBoard" position={fen} onPieceDrop={onDrop} customBoardStyle={{
          borderRadius: "4px",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.5)",
        }}/>
      </div>
  );
}
