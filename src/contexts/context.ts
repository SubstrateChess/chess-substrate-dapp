import React, { useContext, createContext } from 'react';
import { BaseWallet } from '@polkadot-onboard/core';
import { SigningAccount, WalletState } from '../types/walletTypes';

export interface IAccountContext {
    connectedAccount: SigningAccount | undefined;
    walletsAccounts: Map<string, SigningAccount>;
    setConnectedAccount: (signingAccount: SigningAccount | undefined) => void;
}
// account context
const accountContext = createContext({} as IAccountContext);
export const useAccount = () => useContext(accountContext);

export interface IWalletContext {
  wallets: Array<BaseWallet>;
  walletState: Map<string, WalletState>;
  setWalletState: (title: string, state: WalletState) => void;
}

const WalletContext = createContext({} as IWalletContext);
export const useWallets = () => useContext<IWalletContext>(WalletContext);
