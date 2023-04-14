import * as React from 'react';

const headline1Url = new URL(
    '../../../assets/images/headline-1.png',
    import.meta.url
  ).toString();
  

export function Intro(): JSX.Element {
  return (
      <div className="flex w-full flex-col gap-8 md:w-[640px]">
        <div className="flex items-center gap-4 px-4 lg:gap-8 lg:px-0">
          <img width={200} src={headline1Url} alt="Headline image 1" />
          <div className="flex w-full flex-col gap-1">
            <span className="text-h6 font-semibold">Make your vote count</span>
            <span className="text-body-2">
              Through Polkadot OpenGov, all DOT holders can participate in
              governance. You can also appoint a representative with advanced
              expertise to delegate your votes to, as and when you please.
            </span>
          </div>
        </div>
      </div>
  );
}
