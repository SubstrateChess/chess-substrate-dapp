import { SubmittableResult } from '@polkadot/api';
import { Signer, SubmittableExtrinsic } from '@polkadot/api/types';

export async function signAndSend(
    address: string,
    signer: Signer,
    extrinsic: SubmittableExtrinsic<'promise', SubmittableResult>,
    callback: ((result: SubmittableResult) => void) | undefined = undefined
  ): Promise<() => void> {
    const unsub = await extrinsic.signAndSend(
      address,
      { signer },
      (callResult) => {
        const { status } = callResult;
        if (status.isFinalized || status.isInvalid) {
          unsub();
        }
        callback?.(callResult);
      }
    );
    return unsub;
  }