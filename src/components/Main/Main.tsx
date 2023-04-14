import * as React from 'react';
import { Game } from './Game';
import { Intro } from './Intro';


export function Main(): JSX.Element {
  const [gameOnGoing, setGameOnGoing] = React.useState(true);

  return (
    <main className="flex w-full flex-auto flex-col items-center justify-start gap-4 pt-12 md:pt-10 lg:gap-8">
      <div className="mt-8 flex w-full flex-col items-center justify-center gap-12 py-12">
      <div className="flex w-full flex-col items-center gap-0 px-8 lg:gap-0 lg:px-0">
        <span className="text-center font-unbounded text-h3 lg:text-h1">
          {gameOnGoing ? "Your Game" : "Start a Match"}
        </span>
        <span className="px-2 text-center text-body">
          {gameOnGoing ? "Is your turn move" : "Connect your wallet and select the type of match you want to play"}
        </span>
      </div>
      {gameOnGoing ? <Game /> : <Intro />}
    </div>
    </main>
  );
}
