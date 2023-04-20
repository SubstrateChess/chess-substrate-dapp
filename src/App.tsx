import * as React from 'react';
import { PolkadotWalletsContextProvider } from '@polkadot-onboard/react';
import { WalletAggregator } from '@polkadot-onboard/core';
import { InjectedWalletProvider } from '@polkadot-onboard/injected-wallets';
import { WalletConnectProvider } from '@polkadot-onboard/wallet-connect';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Footer from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import { Main } from './components/Main/Main';
import { extensionConfig } from './extensionConfig';
import { WalletProvider } from './contexts/walletProvider';
import { AccountProvider } from './contexts/accountProvider';
import { APIProvider } from './contexts/apiProvider';

const APP_NAME = 'Chess Dapp Substrate';

function App(): JSX.Element {
  let injectedWalletProvider = new InjectedWalletProvider(extensionConfig, APP_NAME);
  let walletConnectParams = {
    projectId: 'chess-dapp-substrate',
    relayUrl: 'ws://127.0.0.1:9944',
    metadata: {
      name: 'Chess Dapp Substrate',
      description: 'Chess Dapp Substrate',
      url: '#',
      icons: ['./logo192.png'],
    },
  };
  let walletConnectProvider = new WalletConnectProvider(walletConnectParams, APP_NAME);
  let walletAggregator = new WalletAggregator([injectedWalletProvider, walletConnectProvider]);
  return (
    <APIProvider>
    <PolkadotWalletsContextProvider walletAggregator={walletAggregator}>
      <WalletProvider>
        <AccountProvider>
          <Header />
          <div className="flex h-screen items-center justify-center">
            <Main />
            <ToastContainer
              position="bottom-center"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
              enableMultiContainer
            />
          </div>
          <Footer />
        </AccountProvider>
      </WalletProvider>  
    </PolkadotWalletsContextProvider>
    </APIProvider>
  );
}

export default App;
