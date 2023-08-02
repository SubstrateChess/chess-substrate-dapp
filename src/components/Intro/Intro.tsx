import * as React from 'react';
import BN from 'bn.js';
import { Button } from '../../ui/Button';
import { CheckBox } from '../../ui/CheckBox';
import { SigningAccount } from '../../types/walletTypes';
import { displayError } from '../../utils/messages';
import { useApi } from '../../contexts/apiProvider';
import { Match, MatchStyle } from '../../types/chessTypes';
import { create_match, join_match } from '../../chain/game';
import { checkCreateMatchForm, checkJoinMatchForm, displayResultExtrinsicMessage } from './introHelper';
import { ExtrinsicResult } from '../../types/apiTypes';
import { getAwaitingUserMatches } from '../../chain/matches';
import { PendingMatch } from '../../ui/PendingMatch';

const whitesImg = new URL(
    '../../../assets/images/whites.png',
    import.meta.url
).toString();

const blacksImg = new URL(
    '../../../assets/images/blacks.png',
    import.meta.url
).toString();

const MatchStyle: string[] = ["Bullet", "Blitz", "Rapid", "Daily"]; // 1 minute, 5min , 15min , 1 days

//TODO: Allow user to specify its own asset for betting
const BET_ASSET_ID = 200;
const BET_ASSET_DEPOSIT = new BN(1_000_000_000_000);

interface IntroProps{
  myAccount: SigningAccount;
  setGameOnGoing: (gameOnGoing: boolean) => void;
}

export function Intro(props: IntroProps): JSX.Element {
  const [checkBoxSelected, setCheckBoxSelected] = React.useState(-1);
  const [addressRival, setAddressRival] = React.useState("");
  const [matchId, setMatchId] = React.useState("");
  const [matches, setMatches] = React.useState<Match[]>([]);

  const { isReady ,api } = useApi();

  React.useEffect(() => {
    async function getAwaitingMatches() {
      if (api !== null && isReady && props.myAccount !== undefined){
        const matches = await getAwaitingUserMatches(api, props.myAccount.account.address);
        if (matches.length > 0) {
          setMatches(matches);
        }
      }
    }
    getAwaitingMatches();
    
  }, []);

  const startGame = async () => {
    if(!api || !props.myAccount){
      displayError("Make sure you have you account and network connected");
      return;
    }
    checkCreateMatchForm(addressRival,checkBoxSelected);
    
    try{
      await create_match(api, props.myAccount, addressRival, MatchStyle[checkBoxSelected] as MatchStyle, BET_ASSET_ID, BET_ASSET_DEPOSIT, 
          (result: ExtrinsicResult) => {
            displayResultExtrinsicMessage(result);
            props.setGameOnGoing(true);
      });
    }
    catch(e: any){
      displayError(e.message);
    }
  }

  const joinGame = async () => {
    if(!api || !props.myAccount){
      displayError("Make sure you have you account and network connected");
      return;
    }
    checkJoinMatchForm(matchId);
    try{
      await join_match(api, props.myAccount, matchId, (result: ExtrinsicResult) => {
          displayResultExtrinsicMessage(result);
          props.setGameOnGoing(true);
      });
    }
    catch(e: any){
      displayError(e.message);
    }
  }

  const joinMatchFromButton = async (match: Match) => {
    if(!api || !props.myAccount){
      displayError("Make sure you have you account and network connected");
      return;
    }
    try{
      await join_match(api, props.myAccount, match.match_id, (result: ExtrinsicResult) => {
          displayResultExtrinsicMessage(result);
          props.setGameOnGoing(true);
      });
    }
    catch(e: any){
      displayError(e.message);
    }
  }
  
  return (
    <>
      <div className="flex w-full flex-col gap-8 md:w-[640px]">
        <div className="flex items-center gap-4 px-4 lg:gap-8 lg:px-0">
          <img width={200} src={whitesImg} alt="whites pieces" />
          <div className="flex w-full flex-col gap-1">
            <span className="text-h6 font-semibold">Start a Match</span>
            <span className="text-body-2">
            <div className="sticky top-44 mb-4 flex flex-row justify-between bg-bg-default/80 px-3 py-3 backdrop-blur-md lg:px-8">
                <CheckBox
                    title={MatchStyle[0]}
                    checked={checkBoxSelected === 0}
                    onChange={(e) => {
                        setCheckBoxSelected(0);
                    }}
                    disabled={false}
                    key={MatchStyle[0]}
                />
                <CheckBox
                    title={MatchStyle[1]}
                    checked={checkBoxSelected === 1}
                    onChange={(e) => {
                        setCheckBoxSelected(1);
                    }}
                    disabled={false}
                    key={MatchStyle[1]}
                />
                <CheckBox
                    title={MatchStyle[2]}
                    checked={checkBoxSelected === 2}
                    onChange={(e) => {
                        setCheckBoxSelected(2);
                    }}
                    disabled={false}
                    key={MatchStyle[2]}
                />
                <CheckBox
                    title={MatchStyle[3]}
                    checked={checkBoxSelected === 3}
                    onChange={(e) => {
                        setCheckBoxSelected(3);
                    }}
                    disabled={false}
                    key={MatchStyle[3]}
                />
            </div>
            <input
              id="address"
              placeholder="Polkadot Address Rival"
              className="w-full self-stretch rounded-lg bg-[#ebeaea] px-4 py-2 text-left text-sm text-black opacity-70"
              onChange={(event) => setAddressRival(event.target.value)}
            />
            </span>
            <Button onClick={startGame}>
                Start Game
            </Button>
          </div>
        </div>
        <div className="flex items-center gap-4 px-4  lg:gap-8 lg:px-0">
          <div className="flex w-full flex-col gap-1">
            <span className="text-h6 font-semibold">
              Join a Match
            </span>
            <span className="text-body-2">
                <input
                    id="address"
                    placeholder="Match Id"
                    className="w-full self-stretch rounded-lg bg-[#ebeaea] px-4 py-2 text-left text-sm text-black opacity-70"
                    onChange={(event) => setMatchId(event.target.value)}
                />
            </span>
            
            <Button onClick={joinGame}>
                Join Game
            </Button>
          </div>
          <img width={200} src={blacksImg} alt="black pieces" />
        </div>

        <div className="flex w-full flex-col gap-1">
            <span className="text-h6 font-semibold">Instructions</span>
            <span className="text-body-2">
              You can start a match indicating the opponent address and the style of the match or join a match against someone that has already challenged you indicating the Match ID of the match you want to join. 
              To play you need minimum amount of the tokens of the network to pay fees.
              You also need the asset 200 to bet against the opponent.
            </span>
          </div>

          {matches.length > 0 && (
            <span className="text-center font-unbounded text-h5 lg:text-h5">
            Awaiting Games ⬇️
            </span>
          )}

        <div>
            {matches.length > 0 && (
              matches.map((match) => (
                <div key={match.match_id}>
                <PendingMatch
                  key={match.match_id}
                  currentMatch={{} as Match}
                  match={match}
                  setMatch={joinMatchFromButton}
                  myAddress={props.myAccount.account.address}
                />
                <br/>
                </div>
              ))
          )}
        </div>
      </div>
      </>
  );
}
