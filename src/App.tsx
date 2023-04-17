import * as React from 'react';
import { PolkadotWalletsContextProvider } from '@polkadot-onboard/react';
import { WalletAggregator } from '@polkadot-onboard/core';
import { InjectedWalletProvider } from '@polkadot-onboard/injected-wallets';
import { WalletConnectProvider } from '@polkadot-onboard/wallet-connect';

import Footer from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import { Main } from './components/Main/Main';
import { extensionConfig } from './extensionConfig';

const APP_NAME = 'Chess Dapp Substrate';

function App(): JSX.Element {
  let injectedWalletProvider = new InjectedWalletProvider(extensionConfig, APP_NAME);
  let walletConnectParams = {
    projectId: '4fae85e642724ee66587fa9f37b997e2',
    relayUrl: 'wss://127.0.0.1:A9944',
    metadata: {
      name: 'Polkadot Demo',
      description: 'Polkadot Demo',
      url: '#',
      icons: ['https://walletconnect.com/walletconnect-logo.png'],
    },
  };
  let walletConnectProvider = new WalletConnectProvider(walletConnectParams, APP_NAME);
  let walletAggregator = new WalletAggregator([injectedWalletProvider, walletConnectProvider]);
  return (
    <PolkadotWalletsContextProvider walletAggregator={walletAggregator}>
      <Header />
      <Main />
      <Footer />
    </PolkadotWalletsContextProvider>
  );
}

export default App;
