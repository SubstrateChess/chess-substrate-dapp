import * as React from 'react';
import { BaseWallet } from '@polkadot-onboard/core';
import { WalletState } from '../../types/walletTypes';
import Wallet from './Wallet';

interface IWalletsListProps {
  wallets: Array<BaseWallet>;
  walletState: Map<string, WalletState>;
  walletConnectHandler: (wallet: BaseWallet) => void;
}

export const WalletsList = ({
  wallets,
  walletState,
  walletConnectHandler,
}: IWalletsListProps) => {
  return (
    <div className="my-2 flex flex-col gap-2">
      {wallets?.map((wallet, index) => {
        const name = wallet?.metadata.title;
        const iconUrl = wallet?.metadata.iconUrl;
        const state = walletState.get(wallet?.metadata.title) || 'disconnected';
        return (
          <Wallet
            key={index}
            name={name}
            state={state}
            clickHandler={() => walletConnectHandler(wallet)}
            iconUrl={iconUrl}
          />
        );
      })}
    </div>
  );
};
