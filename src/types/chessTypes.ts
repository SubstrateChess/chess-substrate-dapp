import BN from 'bn.js';
import type { AccountId32 } from '@polkadot/types/interfaces/runtime';

export type MatchState = 'AwaitingOpponent' | 'OnGoing' | 'Won' | 'Drawn';

export type MatchStyle = "Bullet" |  "Blitz" | "Rapid" | "Daily";

export interface Match {
    match_id: String;
    match: MatchInfo;
}
export interface MatchInfo {
    challenger: String;
    opponent: String;
    board: String;
    state: MatchState;
    nonce: number;
    style: MatchStyle
    lastMove: number;
    start: number;
    betAssetId: number; 
    betAmount: BN;
}