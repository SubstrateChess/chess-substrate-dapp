import { Networks } from "../types/apiTypes";

export const NetworkList: Networks = {
    local: {
      name: 'local',
      endpoints: {
        rpc: 'ws://127.0.0.1:9944',
      },
    },
  };