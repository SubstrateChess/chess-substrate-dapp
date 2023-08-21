import * as React from 'react';
import { PolkadotCircleIcon } from '../../ui/Icons';

const logoUrl = new URL(
  '../../../assets/images/gm.svg',
  import.meta.url
).toString();

export default function Footer() {
  return (
    <div className="fixed bottom-0 flex h-fit w-full items-center justify-between bg-white/50 p-2 text-[0.625rem] backdrop-blur-md">
      <div className="flex items-center gap-2">
        {/* <PolkadotCircleIcon /> */}
        <div className="h-8 w-fit">
            <img className="inline h-full" src={logoUrl} alt="gm logo" />
          </div>
        <span>This Dapp is just for testing purposes, to play with</span>
        <a href="https://github.com/SubstrateChess/pallet-chess" target="_blank" className=" underline">
        the Chess pallet
        </a>
        <a href="https://www.gmordie.com/" target="_blank" className=" underline">
        on the gmordie chain
        </a>
        </div>
      <div className="flex items-center gap-2">
      </div>
    </div>
  );
}