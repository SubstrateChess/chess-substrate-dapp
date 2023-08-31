import * as React from 'react';
import { PolkadotCircleIcon } from '../../ui/Icons';

export default function Footer() {
  return (
    <div className="fixed bottom-0 flex h-fit w-full items-center justify-between bg-white/50 p-2 text-[0.625rem] backdrop-blur-md">
      <div className="flex items-center gap-2">
        <PolkadotCircleIcon />
        <span>This Dapp is just for testing purposes, to play with</span>
        <a href="https://github.com/SubstrateChess/substrate-chess-chain" target="_blank" className=" underline">
        the Chess Chain
        </a>
        </div>
      <div className="flex items-center gap-2">
      </div>
    </div>
  );
}