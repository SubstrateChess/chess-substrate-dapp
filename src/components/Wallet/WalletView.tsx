import * as React from 'react';
import { BaseWallet } from '@polkadot-onboard/core';
import { useAccount, useWallets } from '../../contexts/context';
import { ChevronRightIcon } from '../../ui/Icons';
import { ConnectCard } from '../Accounts/ConnectCard';
import { WalletsList } from './WalletsList';

export const WalletView = ({
    gotoAccountsView,
    walletConnectHandler,
  }: {
    gotoAccountsView: () => void;
    walletConnectHandler: (wallet: BaseWallet) => Promise<void>;
  }) => {
    const { wallets, walletState } = useWallets();
    const { walletsAccounts } = useAccount();
    const loadedAccountsCount = walletsAccounts ? walletsAccounts.size : 0;
    return (
      <>
        <div className="flex flex-col items-start gap-4 border-b">
          <div className="font-brand font-semibold">Wallet</div>
  
          <ConnectCard
            className="my-2 flex w-full flex-row items-center justify-between p-2"
            onClick={() => gotoAccountsView()}
          >
            <div>{`${loadedAccountsCount} Imported Accounts`}</div>
            <ChevronRightIcon />
          </ConnectCard>
        </div>
        <WalletsList
          wallets={wallets}
          walletState={walletState}
          walletConnectHandler={walletConnectHandler}
        />
      </>
    );
  };