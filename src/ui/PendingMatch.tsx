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
        <Card className={`shadow-sd flex w-full flex-col gap-2 p-6 md:gap-4`}>
            <div className="flex cursor-pointer items-start justify-between">
              <div className="flex flex-col items-start">
                <h2 className="text-xl capitalize">{props.match.match.state}</h2>
                <p>Against:</p>
                <AccountIcon
                  address={props.myAddress === props.match.match.opponent ? props.match.match.challenger : props.match.match.opponent}
                  size={24}
                  textClassName="text-body font-semibold my-2"
                />
              </div>
            </div>
            <div>
              Style: {props.match.match.style} 
              <br />
              {props.currentMatch == props.match && (
                <span className="text-green-500"> (Current Match)</span>
              )}
            </div>
            {props.currentMatch != props.match && (
                <Button onClick={startMatch}>
                    Play
                </Button>
            )}
        </Card>
    );
  }