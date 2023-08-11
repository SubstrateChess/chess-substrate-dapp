import * as React from 'react';
import { useAccount } from '../../contexts/contexts';
import { useApi } from '../../contexts/apiProvider';
import { BoardMatch } from '../Match/BoardMatch';
import { Intro } from '../Intro/Intro';
import { Match } from '../../types/chessTypes';
import { getUserMatches } from '../../chain/matches';
import { Matches } from '../Match/Matches';
import { Button } from '../../ui/Button';

const whitesImg = new URL(
  '../../../assets/images/whites.png',
  import.meta.url
).toString();

const blacksImg = new URL(
  '../../../assets/images/blacks.png',
  import.meta.url
).toString();


export function Main(): JSX.Element {
  const [gameOnGoing, setGameOnGoing] = React.useState(false);
  const [isShowingMatches, showMatches] = React.useState(false);
  const [matches, setMatches] = React.useState<Match[]>([]);
  const { status, isReady ,api } = useApi();

  const { connectedAccount } = useAccount();
  console.log(connectedAccount);
  let initialized = false;

  //TODO: When showMatches go to false, get MyMatches too
  React.useEffect(() => {
    async function getMyMatches() {
      if (api !== null && isReady && connectedAccount !== undefined){
        const matches = await getUserMatches(api, connectedAccount.account.address);
        initialized = true;
        if (matches.length > 0) {
          setMatches(matches);
        }
      }
    }
    getMyMatches();
  }, [connectedAccount, gameOnGoing]);

  React.useEffect(() => {
    async function getMyMatches() {
      setMatches([]);
      if (api !== null && isReady && connectedAccount !== undefined){
        const matches = await getUserMatches(api, connectedAccount.account.address);
        if (matches.length > 0) {
          setMatches(matches);
        }
      }
    }
    
     getMyMatches();

  }, [!isShowingMatches]);

  return (
    <main className="flex w-full flex-auto flex-col items-center justify-start gap-4 pt-12 md:pt-10 lg:gap-8">
      <div className="mt-8 flex w-full flex-col items-center justify-center gap-12 py-12">
      <div className="flex w-full flex-col items-center content-between space-y-4 gap-0 px-8 lg:gap-0 lg:px-0">
        {!gameOnGoing &&
          <span className="text-center font-unbounded text-h4 lg:text-h2">
            {isShowingMatches ? "Your Matches" : "Start a Match"}
          </span>
        }
        {(matches.length > 0 && !isShowingMatches) &&
         <div className="flex items-center gap-4 px-4  lg:gap-8 lg:px-0">
         <div className="flex w-full flex-col gap-1">
           <span className="text-h6 font-semibold">
             You have ongoing matches
           </span>
           <Button onClick={() => showMatches(true)} variant="primary">
              My Matches
            </Button>
         </div>
         <img width={200} src={blacksImg} alt="black pieces" />
       </div>
        }
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
        {connectedAccount && ((isShowingMatches) ? 
          <Matches matches={matches} myAccount={connectedAccount} setGameOnGoing={setGameOnGoing} showMatches={showMatches}/> : 
          <Intro myAccount={connectedAccount} setGameOnGoing={setGameOnGoing} showMatches={showMatches}/>
        )}
      </div>
    </div>
    </main>
  );
}
