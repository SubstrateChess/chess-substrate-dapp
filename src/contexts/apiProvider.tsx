import { ApiPromise, WsProvider } from '@polkadot/api';
import React, { useEffect, useState } from 'react';
import { NetworkList } from '../config/networks';
import { APIContextInterface, NetworkState, ConnectionStatus, NetworkName } from '../types/apiTypes';


const defaultApiContext: APIContextInterface = {
    // eslint-disable-next-line
    connect: async () => {
      await new Promise((resolve) => resolve(null));
    },
    api: null,
    isReady: false,
    status: 'disconnected',
    network: NetworkList.local,
  };
const APIContext = React.createContext<APIContextInterface>(
    defaultApiContext
);

export const useApi = () => React.useContext(APIContext);

export const APIProvider = ({ children }: { children: React.ReactNode }) => {
  
    // Store povider instance.
    const [provider, setProvider] = useState<WsProvider | null>(
      null
    );
  
    // API instance state.
    const [api, setApi] = useState<ApiPromise | null>(null);
  
    // Store the initial active network.
    const initialNetwork ='local';

    const [network, setNetwork] = useState<NetworkState>({
      name: initialNetwork,
      meta: NetworkList[initialNetwork],
    });
  
  
    // Store API connection status.
    const [connectionStatus, setConnectionStatus] =
      useState<ConnectionStatus>('disconnected');
  
    // Handle the initial connection
    useEffect(() => {
      if (!provider) {
        connect(initialNetwork);
      }
    });
  
    // Provider event handlers
    useEffect(() => {
      if (provider) {
        provider.on('connected', () => {
          setConnectionStatus('connected');
        });
        provider.on('error', () => {
          setConnectionStatus('disconnected');
        });
        connectedCallback(provider);
      }
    }, [provider]);
  
    // connection callback.
    const connectedCallback = async (_provider: WsProvider) => {
      // initiate new api and set connected.
      const newApi = await ApiPromise.create({ provider: _provider });
      setConnectionStatus('connected');

      setApi(newApi);
    };
  
    // connect function sets provider and updates active network.
    const connect = async (name: NetworkName) => {
      const { endpoints } = NetworkList[name];
  
      let newProvider= new WsProvider(endpoints.rpc);

      setProvider(newProvider);
  
      setNetwork({
        name,
        meta: NetworkList[name],
      });
    };
  
    return (
      <APIContext.Provider
        value={{
          connect,
          api,
          isReady: connectionStatus === 'connected' && api !== null,
          network: network.meta,
          status: connectionStatus,
        }}
      >
        {children}
      </APIContext.Provider>
    );
  };