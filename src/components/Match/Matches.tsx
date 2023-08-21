import * as React from 'react';
import { Match } from '../../types/chessTypes';
import { SigningAccount } from '../../types/walletTypes';
import { PendingMatch } from '../../ui/PendingMatch';
import { BoardMatch } from './BoardMatch';
import { Button } from '../../ui/Button';
import { formatAddressToChain } from '../../utils/accounts';

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
    props.setGameOnGoing(false);
  };

  const playMatch = (match: Match) => {
    setCurrentMatch(match);
    props.setGameOnGoing(true);
  }

  return (
    <>
        <Button onClick={goBack} variant='outline'>
            Back Home
        </Button>
        {currentMatch && (
            <BoardMatch game={currentMatch} matches={props.matches} myAccount={props.myAccount} setGameOnGoing={props.setGameOnGoing} showMatches={props.showMatches} />
        )}
        {currentMatch && props.matches.length > 0 && (
          <span className="text-center font-unbounded text-h5 lg:text-h5">
            Other Matches ⬇️
          </span>
        )}
        {!currentMatch && props.matches.length > 0 && (
            <span className="text-center font-unbounded text-h5 lg:text-h5 space-between">
              Your Current Matches ⬇️
            </span>
        )}
        <div>
            {props.matches.length > 0 && (
              props.matches.map((match) => (
                <div key={match.match_id}>
                <PendingMatch
                  key={match.match_id}
                  currentMatch={currentMatch}
                  match={match}
                  setMatch={playMatch}
                  myAddress={formatAddressToChain(props.myAccount.account.address)}
                />
                <br/>
                </div>
              ))
          )}
        </div>
    </>
  );
}
