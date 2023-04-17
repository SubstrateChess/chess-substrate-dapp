import * as React from 'react';
import {Chess} from "chess.js";
import { Chessboard } from "react-chessboard";
import { Button } from '../../ui/Button';

export const Game = () => {
  const [game, setGame] = React.useState(new Chess());
  const [fen, setFen] = React.useState(game.fen());
  const [matchHasStarted, setMatchHasStarted] = React.useState(false);

  // React.useEffect(() => {
  //   console.log("here");
  //   setGame(new Chess());
  // }, [game]);

  const finishGame = () => {
    if(matchHasStarted){
      console.log("abandom game");
    }
    else {
      console.log("abort game");
    }
  }
  const performMove = () => {
   console.log("move");
  }
  
  function makeAMove(move) {
    const gameCopy = game;
    try{
      const result = gameCopy.move(move);
      setGame(gameCopy);
      setFen(game.fen());
      //Make the move 
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
    <>
      <div className="flex w-full flex-col gap-4 md:w-[480px]">
      <span className="px-2 text-center text-body">
        Move
      </span>
       <Chessboard id="chessBoard" position={fen} onPieceDrop={onDrop} customBoardStyle={{
          borderRadius: "4px",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.5)",
        }}/>
    </div>
    <br />
    <div className="flex items-center gap-4 px-4 lg:gap-8 lg:px-0">
      <Button onClick={finishGame}>
        {matchHasStarted ? "Abort Game" : "Abandon Game"}
      </Button>
    </div>
   
    </>
  );
}
