import * as React from 'react';
import { PolkadotWalletsContextProvider } from '@polkadot-onboard/react';
import { WalletConnectConfiguration } from '@polkadot-onboard/wallet-connect';
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
  // let walletConnectParams = {
  //   projectId: 'chess-dapp-substrate',
  //   //relayUrl: 'ws://127.0.0.1:9944',
  //   relayUrl: 'wss://ws.gm.bldnodes.org',
  //   metadata: {
  //     name: 'Chess Dapp Substrate',
  //     description: 'Chess Dapp Substrate',
  //     url: '#',
  //     icons: ['./logo192.png'],
  //   },
  //   chainId: 'polkadot:91b171bb158e2d3848fa23a9f1c25182',
  // };
  let walletConnectParams = {
    projectId: '4fae85e642724ee66587fa9f37b997e2',
    relayUrl: 'wss://relay.walletconnect.com',
    metadata: {
      name: 'Polkadot Demo',
      description: 'Polkadot Demo',
      url: '#',
      icons: ['https://walletconnect.com/walletconnect-logo.png'],
    },
    chainIds: ['polkadot:e143f23803ac50e8f6f8e62695d1ce9e', 'polkadot:91b171bb158e2d3848fa23a9f1c25182'],
  };
  let walletConnectProvider = new WalletConnectProvider(walletConnectParams, APP_NAME);
  let walletAggregator = new WalletAggregator([injectedWalletProvider, walletConnectProvider]);
  return (
    <APIProvider>
    <PolkadotWalletsContextProvider walletAggregator={walletAggregator}>
      <WalletProvider>
        <AccountProvider>
          <Header />
          <div className="flex items-center justify-center">
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
