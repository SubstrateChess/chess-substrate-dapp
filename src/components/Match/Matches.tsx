import * as React from 'react';
import { Match } from '../../types/chessTypes';
import { SigningAccount } from '../../types/walletTypes';
import { PendingMatch } from '../../ui/PendingMatch';
import { BoardMatch } from './BoardMatch';
import { Button } from '../../ui/Button';

interface MatchProps{
  matches: Match[];
  myAccount: SigningAccount;
  setGameOnGoing: (gameOnGoing: boolean) => void;
  showMatches: (isShowingMatches: boolean) => void;
}
export const Matches = (props: MatchProps) => {
  const [currentMatch, setCurrentMatch] = React.useState<Match | null>(null);

  const goBack = () => {
    props.showMatches(false);
  };

  return (
    <>
        <Button onClick={goBack}>
            {"Create a new Match"}
        </Button>
        {currentMatch && (
            <BoardMatch game={currentMatch} matches={props.matches} myAccount={props.myAccount} setGameOnGoing={props.setGameOnGoing} changeMatch={setCurrentMatch} />
        )}
        {currentMatch && props.matches.length > 0 && (
          <span className="text-center font-unbounded text-h5 lg:text-h5">
          Other Games ⬇️
          </span>
        )}
        {!currentMatch && props.matches.length > 0 && (
          <>
            <br />
            <span className="text-center font-unbounded text-h5 lg:text-h5 space-between">
            Your Current Games ⬇️
            </span>
            <br />
          </>
        )}
        <div>
            {props.matches.length > 0 && (
              props.matches.map((match) => (
                <div key={match.match_id}>
                <PendingMatch
                  key={match.match_id}
                  currentMatch={currentMatch}
                  match={match}
                  setMatch={setCurrentMatch}
                  myAddress={props.myAccount.account.address}
                />
                <br/>
                </div>
              ))
          )}
        </div>
    </>
  );
}
