import { WalletState } from "../contexts/contexts";

/**
 * Provides a local storage utility class to store the connection state of each wallet.
 * WalletState can be :'connected' | 'disconnected'
 * the state is stored in localStorage under `wallet#<walletTitle>`
 * e.g. 'wallet#polkadot-js' is the key for polkadot-js extension wallet
 */
export class WalletStateStorage {
    static getStateStorageKey(walletTitle: string) {
      return `wallet#${walletTitle}`;
    }
    static set(walletTitle: string, state: WalletState) {
      const sKey = this.getStateStorageKey(walletTitle);
      localStorage.setItem(sKey, state);
    }
    static get(walletTitle: string) {
      const sKey = this.getStateStorageKey(walletTitle);
      return localStorage.getItem(sKey);
    }
  }