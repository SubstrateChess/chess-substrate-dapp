import * as React from 'react';
import { Button } from '../../ui/Button';
import { CheckBox } from '../../ui/CheckBox';

const headline1Url = new URL(
    '../../../assets/images/headline-1.png',
    import.meta.url
).toString();

const headline2Url = new URL(
    '../../../assets/images/headline-2.png',
    import.meta.url
).toString();

const MatchStyle: string[] = ["Bullet", "Blitz", "Rapid", "Daily"]; // 1 minute, 5min , 15min , 1 days


export function Intro(): JSX.Element {
  const [checkBoxSelected, setCheckBoxSelected] = React.useState(-1);
  const [addressRival, setAddressRival] = React.useState("");
  const [matchId, setMatchId] = React.useState("");

  const startGame = () => {
    console.log("start game");
  }

  const joinGame = () => {
    console.log("join game");
  }
  
  return (
      <div className="flex w-full flex-col gap-8 md:w-[640px]">
        <div className="flex items-center gap-4 px-4 lg:gap-8 lg:px-0">
          <img width={200} src={headline1Url} alt="Headline image 1" />
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
                />
                <CheckBox
                    title={MatchStyle[1]}
                    checked={checkBoxSelected === 1}
                    onChange={(e) => {
                        setCheckBoxSelected(1);
                    }}
                    disabled={false}
                />
                <CheckBox
                    title={MatchStyle[2]}
                    checked={checkBoxSelected === 2}
                    onChange={(e) => {
                        setCheckBoxSelected(2);
                    }}
                    disabled={false}
                />
                <CheckBox
                    title={MatchStyle[3]}
                    checked={checkBoxSelected === 3}
                    onChange={(e) => {
                        setCheckBoxSelected(3);
                    }}
                    disabled={false}
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
                    onChange={(event) => setAddressRival(event.target.value)}
                />
            </span>
            <Button onClick={joinGame}>
                Join Game
            </Button>
          </div>
          <img width={200} src={headline2Url} alt="Headline image 1" />
        </div>
      </div>
  );
}
