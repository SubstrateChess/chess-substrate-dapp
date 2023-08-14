import { encodeAddress } from "@polkadot/util-crypto";

const SS58_PREFIX = 7013;

export const formatAddressToChain = (address: string) => {
  const formatted = encodeAddress(address, SS58_PREFIX);
  return formatted;
};
