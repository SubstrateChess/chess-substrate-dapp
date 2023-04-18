import { useEffect, useState } from 'react';
import { useWallets as _useWallets} from '@polkadot-onboard/react';
import { WalletState, WalletContext } from './contexts';
import { WalletStateStorage } from '../storage/walletStateStorage';
import { BaseWallet } from '@polkadot-onboard/core';

export const WalletProvider = ({ children }: { children: React.ReactNode }) => {
    const { wallets } = _useWallets();
    const [walletState, _setWalletState] = useState<Map<string, WalletState>>(
      new Map<string, WalletState>()
    );
    const setWalletState = (title: string, state: WalletState) => {
      _setWalletState(
        (oldState) => new Map<string, WalletState>([...oldState, [title, state]])
      );
      WalletStateStorage.set(title, state);
    };
  
    const initiateWallets = async (wallets: Array<BaseWallet>) => {
      const walletState: Map<string, WalletState> = new Map<
        string,
        WalletState
      >();
      for (const wallet of wallets) {
        const title = wallet.metadata?.title;
        if (title) {
          const state = WalletStateStorage.get(title);
          if (state === 'connected') {
            await wallet.connect();
            walletState.set(title, 'connected');
          }
        }
      }
      _setWalletState(walletState);
    };
  
    useEffect(() => {
      if (wallets) {
        initiateWallets(wallets);
      }
    }, [wallets]);
    
    return (
      <WalletContext.Provider
        value={{ wallets: wallets || [], walletState, setWalletState }}
      >
        {children}
      </WalletContext.Provider>
    );
  };