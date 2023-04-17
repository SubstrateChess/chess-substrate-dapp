import { memo} from 'react';
import { BaseWallet } from '@polkadot-onboard/core';
import { useWallets } from '../../contexts/contexts';
import { ConnectCard } from '../../ui/ConnectCard';
import { ConnectedIcon, AddIcon } from '../../ui/Icons';


interface IWalletProps {
    wallet: BaseWallet;
    clickHandler: () => void;
}

const Wallet = ({ wallet, clickHandler }: IWalletProps) => {
  const { walletState } = useWallets();
  let isConnected = false;
  if(walletState){
    const state = walletState.get(wallet?.metadata.title) || 'disconnected';
    isConnected = state === 'connected';
  }
  return (
    <ConnectCard
      className="flex flex-nowrap gap-2 p-2 "
      onClick={() => clickHandler()}
    >
      <div className="flex-auto">
        <div>{wallet?.metadata.title}</div>
      </div>
      <div className="flex min-w-[1.5rem] items-center justify-center">
        {isConnected ? (
          <div className="text-[0.5rem] text-green-500">
            <ConnectedIcon />
          </div>
        ) : (
          <div className="text-gray-500">
            <AddIcon />
          </div>
        )}
      </div>
    </ConnectCard>
  );
};

export default memo(Wallet);