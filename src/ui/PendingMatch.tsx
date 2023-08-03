import { Match, MatchInfo } from '../types/chessTypes';
import { AccountIcon } from './AccountIcon';
import { Button } from './Button';
import { Card } from './Card';

interface PendingMatchProps{
    currentMatch: Match | null;
    match: Match;
    myAddress: string;
    setMatch: (match: Match) => void;
}


export function PendingMatch(props: PendingMatchProps) {
    const startMatch = () => {
        props.setMatch(props.match);
    }

    const parseStatus = (matchInfo: MatchInfo) => {
      if(matchInfo.state === "AwaitingOpponent" && props.myAddress === matchInfo.opponent){
        return "Waiting for you to accept";
      }
      else if(matchInfo.state === "AwaitingOpponent" && props.myAddress === matchInfo.challenger){
        return "Waiting for the opponent to accept";
      }
      return matchInfo.state;
    }
    return (
        <Card className={`shadow-sd flex w-full flex-col gap-2 p-6 md:gap-4  items-center`}>
            <div className="flex cursor-pointer items-center justify-between">
              <div className="flex flex-col items-center">
                <h2 className="text-xl capitalize font-semibold">{parseStatus(props.match.match)}</h2>
                <AccountIcon
                  address={props.myAddress === props.match.match.opponent ? props.match.match.challenger : props.match.match.opponent}
                  size={24}
                  textClassName="text-body font-semibold my-2"
                />
              </div>
            </div>
            <div className="flex flex-col items-center justify-center">
                  <h6 className="text-xl center"> Style: {props.match.match.style} </h6>
                  {props.currentMatch && props.currentMatch == props.match && (
                    <span className="text-green-500"> (Current Match)</span>
                  )}
            </div>
            {props.currentMatch != props.match && (
              <div className="flex flex-col items-center justify-center">
                  <Button onClick={startMatch} variant='primary'>
                      {(props.match.match.state === "AwaitingOpponent" && 
                        props.myAddress === props.match.match.opponent) ? "Join Game" : "Play Game"
                      }
                  </Button>
              </div>
            )}
        </Card>
    );
  }