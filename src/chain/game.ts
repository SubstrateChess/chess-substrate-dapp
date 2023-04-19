import { ApiPromise } from "@polkadot/api";
import { SubmittableResult } from '@polkadot/api';
import { signAndSend } from "../utils/walletOperations";
import { SigningAccount } from "../types/walletTypes";

export async function make_move(
    api: ApiPromise, 
    myAccount: SigningAccount, 
    matchId: string, 
    move_fen: String, 
    callback: ((result: SubmittableResult) => void) | undefined = undefined): Promise<() => void> {
    const move_extrinsic = api.tx.chess.makeMove(matchId, move_fen);
    const unsub = await signAndSend(myAccount.account.address, myAccount.signer, move_extrinsic, (callResult) => {
            const { status } = callResult;
            if (status.isFinalized || status.isInvalid) {
              unsub();
            }
            callback?.(callResult);
    });
    return unsub;
}