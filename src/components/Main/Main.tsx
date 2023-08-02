import * as React from 'react';
import { useAccount } from '../../contexts/contexts';
import { useApi } from '../../contexts/apiProvider';
import { BoardMatch } from '../Match/BoardMatch';
import { Intro } from '../Intro/Intro';
import { Match } from '../../types/chessTypes';
import { getUserMatches } from '../../chain/matches';

const whitesImg = new URL(
  '../../../assets/images/whites.png',
  import.meta.url
).toString();


export function Main(): JSX.Element {
  const [gameOnGoing, setGameOnGoing] = React.useState(false);
  const [match, setMatch] = React.useState<Match | null>(null);
  const [matches, setMatches] = React.useState<Match[]>([]);
  const { status, isReady ,api } = useApi();

  const { connectedAccount } = useAccount();
  

  React.useEffect(() => {
    async function getMyMatches() {
      if (api !== null && isReady && connectedAccount !== undefined){
        const matches = await getUserMatches(api, connectedAccount.account.address);
        if (matches.length > 0) {
          setGameOnGoing(true);
          setMatch(matches[0]);
          setMatches(matches);
        }
      }
    }
    getMyMatches();
  }, [connectedAccount, gameOnGoing]);

  return (
    <main className="flex w-full flex-auto flex-col items-center justify-start gap-4 pt-12 md:pt-10 lg:gap-8">
      <div className="mt-8 flex w-full flex-col items-center justify-center gap-12 py-12">
      <div className="flex w-full flex-col items-center gap-0 px-8 lg:gap-0 lg:px-0">
        <span className="text-center font-unbounded text-h3 lg:text-h1">
          {gameOnGoing ? "Match" : "Start a Match"}
        </span>
        {!connectedAccount && 

          <span className="px-1 text-center text-body">
            Connect your wallet to play
            <img width={500} src={whitesImg} alt="whites pieces" />
          </span>
        }
        {status === "disconnected" && 
          <span className="px-1 text-center text-body">
            ❌ To play run the Chess Parachain locally first ❌
          </span>
        }
        {connectedAccount && ((gameOnGoing && match) ? 
          <BoardMatch game={match} matches={matches} myAccount={connectedAccount} setGameOnGoing={setGameOnGoing} changeMatch={setMatch} /> : 
          <Intro myAccount={connectedAccount} setGameOnGoing={setGameOnGoing}/>
        )}
      </div>
    </div>
    </main>
  );
}
