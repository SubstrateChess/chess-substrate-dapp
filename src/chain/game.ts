import { ApiPromise } from "@polkadot/api";
import { SubmittableResult } from '@polkadot/api';
import { signAndSend } from "../utils/walletOperations";
import { SigningAccount } from "../types/walletTypes";
import { MatchStyle } from "../types/chessTypes";
import BN from "bn.js";

export async function make_move(
    api: ApiPromise, 
    myAccount: SigningAccount, 
    matchId: string, 
    move_fen: String, 
    callback: ((result: SubmittableResult) => void) | undefined = undefined): Promise<() => void> {
    const extrinsic = api.tx.chess.makeMove(matchId, move_fen);
    const unsub = await signAndSend(myAccount.account.address, myAccount.signer, extrinsic, (callResult) => {
            const { status } = callResult;
            if (status.isFinalized || status.isInvalid) {
              unsub();
            }
            callback?.(callResult);
    });
    return unsub;
}

export async function abort_match(
    api: ApiPromise, 
    myAccount: SigningAccount, 
    matchId: string, 
    callback: ((result: SubmittableResult) => void) | undefined = undefined): Promise<() => void> {
    const extrinsic = api.tx.chess.abortMatch(matchId);
    const unsub = await signAndSend(myAccount.account.address, myAccount.signer, extrinsic, (callResult) => {
            const { status } = callResult;
            if (status.isFinalized || status.isInvalid) {
              unsub();
            }
            callback?.(callResult);
    });
    return unsub;
}

export async function abandon_match(
    api: ApiPromise, 
    myAccount: SigningAccount, 
    matchId: string, 
    callback: ((result: SubmittableResult) => void) | undefined = undefined): Promise<() => void> {
    const extrinsic = api.tx.chess.clearAbandonedMatch(matchId);
    const unsub = await signAndSend(myAccount.account.address, myAccount.signer, extrinsic, (callResult) => {
            const { status } = callResult;
            if (status.isFinalized || status.isInvalid) {
              unsub();
            }
            callback?.(callResult);
    });
    return unsub;
}

export async function create_match(
    api: ApiPromise, 
    myAccount: SigningAccount, 
    opponent: string,
    style: MatchStyle,
    betAssetId: number,
    betAmount: BN,
    callback: ((result: SubmittableResult) => void) | undefined = undefined): Promise<() => void> {
    const extrinsic = api.tx.chess.createMatch(opponent,style,betAssetId,betAmount);
    const unsub = await signAndSend(myAccount.account.address, myAccount.signer, extrinsic, (callResult) => {
            const { status } = callResult;
            if (status.isFinalized || status.isInvalid) {
              unsub();
            }
            callback?.(callResult);
    });
    return unsub;
}

export async function join_match(
    api: ApiPromise, 
    myAccount: SigningAccount, 
    matchId: string,
    callback: ((result: SubmittableResult) => void) | undefined = undefined): Promise<() => void> {
    const extrinsic = api.tx.chess.joinMatch(matchId);
    const unsub = await signAndSend(myAccount.account.address, myAccount.signer, extrinsic, (callResult) => {
            const { status } = callResult;
            if (status.isFinalized || status.isInvalid) {
              unsub();
            }
            callback?.(callResult);
    });
    return unsub;
}