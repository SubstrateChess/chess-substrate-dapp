import * as React from 'react';
import { Game } from './Game';
import { Intro } from './Intro';


export function Main(): JSX.Element {
  const [gameOnGoing, setGameOnGoing] = React.useState(true);

  return (
    <main className="flex w-full flex-auto flex-col items-center justify-start gap-8 pt-14 md:pt-20 lg:gap-16">
      <div className="mt-8 flex w-full flex-col items-center justify-center gap-12 py-12">
      <div className="flex w-full flex-col items-center gap-3 px-8 lg:gap-0 lg:px-0">
        <span className="text-center font-unbounded text-h3 lg:text-h1">
          {gameOnGoing ? "Your Game" : "Start a Match"}
        </span>
        <span className="px-3 text-center text-body">
          {gameOnGoing ? "Is your turn move" : "Connect your wallet and select the type of match you want to play"}
        </span>
      </div>
      {gameOnGoing ? <Game /> : <Intro />}
    </div>
    </main>
  );
}
