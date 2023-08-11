import { Networks } from "../types/apiTypes";

export const NetworkList: Networks = {
    local: {
      name: 'GM',
      endpoints: {
        //rpc: 'ws://127.0.0.1:9944',
        rpc: 'wss://ws.gm.bldnodes.org',
      },
    },
  };