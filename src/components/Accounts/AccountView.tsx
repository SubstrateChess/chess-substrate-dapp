import * as React from 'react';
import { SigningAccount } from '../../types/walletTypes';
import { useAccount } from '../../contexts/context';
import { WalletIcon } from '../../ui/Icons';
import { AccountList } from './AccountList';

export const AccountView = ({
    gotoWalletsView,
    accountConnectHandler,
  }: {
    gotoWalletsView: () => void;
    accountConnectHandler: (
      signingAccount: SigningAccount | undefined
    ) => Promise<void>;
  }) => {
    const { connectedAccount, walletsAccounts } = useAccount();
    return (
      <>
        <div className="flex flex-row items-center justify-between">
          <div className="font-brand uppercase">Accounts</div>
          <div
            className="flex cursor-pointer flex-row items-center justify-center gap-2 rounded-2xl border border-solid px-4 py-1 "
            onClick={() => gotoWalletsView()}
          >
            <WalletIcon />
            <div className="text-xs font-semibold">Wallets</div>
          </div>
        </div>
        <AccountList
          accounts={walletsAccounts}
          connectedAccount={connectedAccount}
          accountConnectHandler={accountConnectHandler}
        />
      </>
    );
  };