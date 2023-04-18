import React, {useState, useEffect } from 'react';
import { SigningAccount } from "../types/walletTypes";
import { AccountStorage } from "../storage/accountStorage";
import { accountContext, useWallets } from "./contexts";

export const AccountProvider = ({ children }: { children: React.ReactNode }) => {
    const [_connectedAccount, _setConnectedAccount] = useState<
      SigningAccount | undefined
    >();
    const { wallets, walletState } = useWallets();
    const [walletsAccounts, setWalletsAccounts] = useState<
      Map<string, SigningAccount>
    >(new Map<string, SigningAccount>());
  
    const loadConnectedAccount = async (): Promise<
      SigningAccount | undefined
    > => {
      const walletsAccounts = await getWalletsAccounts();
      const connectedAddress = AccountStorage.getConnectedAddress();
      if (connectedAddress) {
        return walletsAccounts.get(connectedAddress);
      }
    };
  
    const getWalletsAccounts = async () => {
      let signingAccounts = new Map<string, SigningAccount>();
      for (const wallet of wallets) {
        const {
          signer,
          metadata: { title },
        } = wallet;
        if (signer && walletState.get(title) === 'connected') {
          const walletSigningAccounts = new Map<string, SigningAccount>();
          const accounts = await wallet.getAccounts();
          if (accounts.length > 0) {
            for (const account of accounts) {
              walletSigningAccounts.set(account.address, {
                account,
                signer,
                sourceMetadata: wallet.metadata,
              });
            }
            signingAccounts = new Map([
              ...signingAccounts,
              ...walletSigningAccounts,
            ]);
          }
        }
      }
      return signingAccounts;
    };
  
    const accountSourceIsConnected = (signingAccount: SigningAccount) => {
      const {
        sourceMetadata: { title },
      } = signingAccount;
      return walletState.get(title) === 'connected';
    };
  
    const setConnectedAccount = (signingAccount: SigningAccount | undefined) => {
      const connectedAddress = signingAccount?.account.address;
      AccountStorage.setConnectedAddress(connectedAddress || '');
      _setConnectedAccount(signingAccount);
    };
  
    // load connected account from storage
    const storedConnectedAddress = AccountStorage.getConnectedAddress();
    useEffect(() => {
      if (storedConnectedAddress) {
        loadConnectedAccount().then((signingAccount) => {
          if (signingAccount) {
            setConnectedAccount(signingAccount);
          }
        });
      }
    }, [storedConnectedAddress, walletsAccounts]);
  
    // load accounts from connected wallets
    useEffect(() => {
      getWalletsAccounts().then((accounts: Map<string, SigningAccount>) => {
        setWalletsAccounts(accounts);
      });
    }, [wallets, walletState]);
  
    const connectedAccount =
      _connectedAccount && accountSourceIsConnected(_connectedAccount)
        ? _connectedAccount
        : undefined;
    return (
      <accountContext.Provider
        value={{
          connectedAccount,
          setConnectedAccount,
          walletsAccounts,
        }}
      >
        {children}
      </accountContext.Provider>
    );
  };