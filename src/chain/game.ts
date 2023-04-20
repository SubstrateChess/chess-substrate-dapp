import { ApiPromise } from "@polkadot/api";
import { SubmittableResult } from '@polkadot/api';
import { signAndSend } from "../utils/walletOperations";
import { SigningAccount } from "../types/walletTypes";
import { MatchStyle } from "../types/chessTypes";
import BN from "bn.js";
import { ExtrinsicResult } from "../types/apiTypes";

export async function make_move(
    api: ApiPromise, 
    myAccount: SigningAccount, 
    matchId: string, 
    move_fen: String, 
    callback: ((result: ExtrinsicResult) => void) | undefined = undefined): Promise<() => void> {
    const extrinsic = api.tx.chess.makeMove(matchId, move_fen);
    const unsub = await signAndSend(myAccount.account.address, myAccount.signer, extrinsic, (result) => {
      //Back to the main screen if the transaction is in a block (Should be isFinalized??);
      if(result.status.isInBlock){
        result.events.forEach(({ event: { method, data } }: any) => {
          if (method === 'ExtrinsicSuccess') {
            callback?.({success: true, message: "Match created successfully"});
          }
          if(method === 'ExtrinsicFailed'){
            // TODO:Get error message from pallet (metadata)
            callback?.({success: false, message: "Error: "+ data.dispatchError.toString()});
          }
        });
        unsub();
      }
    });
    return unsub;
}

export async function abort_match(
    api: ApiPromise, 
    myAccount: SigningAccount, 
    matchId: string, 
    callback: ((result: ExtrinsicResult) => void) | undefined = undefined): Promise<() => void> {
    const extrinsic = api.tx.chess.abortMatch(matchId);
    const unsub = await signAndSend(myAccount.account.address, myAccount.signer, extrinsic, (result) => {
      //Back to the main screen if the transaction is in a block (Should be isFinalized??);
      if(result.status.isInBlock){
        result.events.forEach(({ event: { method, data } }: any) => {
          if (method === 'ExtrinsicSuccess') {
            callback?.({success: true, message: "Match created successfully"});
          }
          if(method === 'ExtrinsicFailed'){
            // TODO:Get error message from pallet (metadata)
            callback?.({success: false, message: "Error: "+ data.dispatchError.toString()});
          }
        });
        unsub();
      }
    });
    return unsub;
}

export async function abandon_match(
    api: ApiPromise, 
    myAccount: SigningAccount, 
    matchId: string, 
    callback: ((result: ExtrinsicResult) => void) | undefined = undefined): Promise<() => void> {
    const extrinsic = api.tx.chess.clearAbandonedMatch(matchId);
    const unsub = await signAndSend(myAccount.account.address, myAccount.signer, extrinsic, (result) => {
      //Back to the main screen if the transaction is in a block (Should be isFinalized??);
      if(result.status.isInBlock){
        result.events.forEach(({ event: { method, data } }: any) => {
          if (method === 'ExtrinsicSuccess') {
            callback?.({success: true, message: "Match created successfully"});
          }
          if(method === 'ExtrinsicFailed'){
            // TODO:Get error message from pallet (metadata)
            callback?.({success: false, message: "Error: "+ data.dispatchError.toString()});
          }
        });
        unsub();
      }
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
    callback: ((result: ExtrinsicResult) => void) | undefined = undefined): Promise<() => void> {
    const extrinsic = api.tx.chess.createMatch(opponent,style,betAssetId,betAmount);
    const unsub = await signAndSend(myAccount.account.address, myAccount.signer, extrinsic, (result) => {
      //Back to the main screen if the transaction is in a block (Should be isFinalized??);
      if(result.status.isInBlock){
        result.events.forEach(({ event: { method, data } }: any) => {
          if (method === 'ExtrinsicSuccess') {
            callback?.({success: true, message: "Match created successfully"});
          }
          if(method === 'ExtrinsicFailed'){
            // TODO:Get error message from pallet (metadata)
            callback?.({success: false, message: "Error: "+ data.dispatchError.toString()});
          }
        });
        unsub();
      }
    });
    return unsub;
}

export async function join_match(
    api: ApiPromise, 
    myAccount: SigningAccount, 
    matchId: string,
    callback: ((result: ExtrinsicResult) => void) | undefined = undefined): Promise<() => void> {
    const extrinsic = api.tx.chess.joinMatch(matchId);
    const unsub = await signAndSend(myAccount.account.address, myAccount.signer, extrinsic, (result) => {
      //Back to the main screen if the transaction is in a block (Should be isFinalized??);
      if(result.status.isInBlock){
        result.events.forEach(({ event: { method, data } }: any) => {
          if (method === 'ExtrinsicSuccess') {
            callback?.({success: true, message: "Match created successfully"});
          }
          if(method === 'ExtrinsicFailed'){
            // TODO:Get error message from pallet (metadata)
            callback?.({success: false, message: "Error: "+ data.dispatchError.toString()});
          }
        });
        unsub();
      }
    });
    return unsub;
}