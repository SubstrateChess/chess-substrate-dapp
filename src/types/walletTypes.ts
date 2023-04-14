import type { Account, WalletMetadata } from '@polkadot-onboard/core';
import type { Signer } from '@polkadot/types/types';

export type SigningAccount = {
  account: Account;
  signer: Signer;
  sourceMetadata: WalletMetadata;
};

export type ConnectViews = 'wallets' | 'accounts';

export type WalletState = 'connected' | 'disconnected';