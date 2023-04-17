import { memo } from 'react';
import { useWallets } from '@polkadot-onboard/react';
import { BaseWallet } from '@polkadot-onboard/core';
import Wallet from './Wallet';
import { useAccount } from '../../contexts/contexts';
import { ConnectCard } from '../../ui/ConnectCard';
import { ChevronRightIcon } from '../../ui/Icons';

const Wallets = ({
    gotoAccountsView,
    walletConnectHandler,
  }: {
    gotoAccountsView: () => void;
    walletConnectHandler: (wallet: BaseWallet) => Promise<void>;
}) => {
  const { wallets } = useWallets();
  const { walletsAccounts } = useAccount();
  const loadedAccountsCount = walletsAccounts ? walletsAccounts.size : 0;

  if (!Array.isArray(wallets)) {
    return null;
  }

  return (
    <>
    <div className="flex flex-col items-start gap-4 border-b">
        <div className="font-brand font-semibold">Wallets</div>
      <ConnectCard
          className="my-2 flex w-full flex-row items-center justify-between p-2"
          onClick={() => gotoAccountsView()}
        >
          <div>{`${loadedAccountsCount} Imported Accounts`}</div>
          <ChevronRightIcon />
        </ConnectCard>
    </div>
    <div className="my-2 flex flex-col gap-2">
      {wallets.map((wallet: BaseWallet) => (
        <Wallet key={wallet.metadata.title} wallet={wallet} clickHandler={() => walletConnectHandler(wallet)}/>
      ))}
    </div>
    </>
  );
};

export default memo(Wallets);