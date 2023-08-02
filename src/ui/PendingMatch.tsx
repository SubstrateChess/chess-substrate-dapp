import { Match } from '../types/chessTypes';
import { AccountIcon } from './AccountIcon';
import { Button } from './Button';
import { Card } from './Card';

interface PendingMatchProps{
    currentMatch: Match;
    match: Match;
    myAddress: string;
    setMatch: (match: Match) => void;
}


export function PendingMatch(props: PendingMatchProps) {
    const startMatch = () => {
        props.setMatch(props.match);
    }
    return (
        <Card className={`shadow-sd flex w-full flex-col gap-4 p-8 md:gap-5`}>
            <div className="flex cursor-pointer items-center justify-between">
              <div className="flex flex-col items-center">
                <h2 className="text-xl">Status</h2>
                <h2 className="text-xl capitalize font-semibold">{props.match.match.state}</h2>
                <AccountIcon
                  address={props.myAddress === props.match.match.opponent ? props.match.match.challenger : props.match.match.opponent}
                  size={24}
                  textClassName="text-body font-semibold my-2"
                />
              </div>
            </div>
            <div className="flex flex-col items-center justify-center">
                  <h6 className="text-xl center"> Style: {props.match.match.style} </h6>
                  {props.currentMatch == props.match && (
                    <span className="text-green-500"> (Current Match)</span>
                  )}
            </div>
            <br/>
            {props.currentMatch != props.match && (
              <div className="flex flex-col items-center justify-center">
                  <Button onClick={startMatch}>
                      Play Game
                  </Button>
              </div>
            )}
        </Card>
    );
  }