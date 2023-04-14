import * as React from 'react';
import { useEffect, useState } from 'react';
import { BaseWallet } from '@polkadot-onboard/core';
import Identicon from '@polkadot/react-identicon';

import { SigningAccount, ConnectViews } from '../../types/walletTypes';
import { AccountView } from '../Accounts/AccountView';
import { useAccount, useWallets } from '../../contexts/context';
import { WalletView } from '../Wallet/WalletView';
import { Button } from '../../ui/Button';
import { Modal } from '../../ui/Modal';

export const ConnectButton = () => {
    const [visible, setVisible] = useState(false);
    const [currentView, setCurrentView] = useState<ConnectViews>();
    const { walletState, setWalletState } = useWallets();
    const { connectedAccount, setConnectedAccount, walletsAccounts } =
      useAccount();
  
    const loadedAccountsCount = walletsAccounts ? walletsAccounts.size : 0;
  
    const initialView: ConnectViews =
      loadedAccountsCount > 0 ? 'accounts' : 'wallets';
  
    const toggleView = () => {
      setCurrentView((oldView) =>
        oldView === 'wallets' ? 'accounts' : 'wallets'
      );
    };
  
    const accountConnectHandler = async (
      signingAccount: SigningAccount | undefined
    ) => {
      setConnectedAccount(signingAccount);
      closeModal();
    };
  
    const walletConnectHandler = async (wallet: BaseWallet) => {
      if (walletState.get(wallet?.metadata.title) == 'connected') {
        await wallet.disconnect();
        setWalletState(wallet?.metadata.title, 'disconnected');
      } else {
        await wallet.connect();
        setWalletState(wallet?.metadata.title, 'connected');
      }
    };
  
    const closeModal = () => {
      setVisible(false);
    };
  
    const openModal = () => {
      setCurrentView(initialView);
      setVisible(true);
    };
  
    useEffect(() => {
      setCurrentView(initialView);
    }, [initialView]);
  
    const btnClickHandler = () => openModal();
    const { name, address } = connectedAccount?.account || {};
    const btnTitle = connectedAccount?.account ? name || address : 'Connect';
  
    return (
      <>
        <Button onClick={btnClickHandler}>
          <div className="flex flex-nowrap items-center gap-1">
            {address && (
              <Identicon
                style={{ cursor: 'unset' }}
                value={address}
                theme="polkadot"
                size={18}
              />
            )}
            <div className="text-sm">{btnTitle}</div>
          </div>
        </Button>
        <Modal open={visible} onClose={() => closeModal()}>
          <div className="flex max-h-[90vh] flex-col px-1 py-2">
            {currentView === 'accounts' ? (
              <AccountView
                gotoWalletsView={() => toggleView()}
                accountConnectHandler={accountConnectHandler}
              />
            ) : (
              <WalletView
                gotoAccountsView={() => toggleView()}
                walletConnectHandler={walletConnectHandler}
              />
            )}
          </div>
        </Modal>
      </>
    );
  };