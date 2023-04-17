import { ApiPromise } from '@polkadot/api';


export type ConnectionStatus = 'connecting' | 'connected' | 'disconnected';
export type NetworkName = 'local';

export interface Networks {
    [key: string]: Network;
}

interface Network {
    name: string;
    endpoints: {
      rpc: string;
    };
  }

export interface NetworkState {
  name: NetworkName;
  meta: Network;
}

export interface APIContextInterface {
    connect: (n: NetworkName) => Promise<void>;
    api: ApiPromise | null;
    isReady: boolean;
    status: ConnectionStatus;
    network: Network;
  }