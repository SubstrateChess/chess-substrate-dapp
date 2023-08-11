import BN from 'bn.js';

export type MatchState = 'AwaitingOpponent' | 'Whites' |  'Blacks' | 'Won' | 'Drawn';

export type MatchStyle = "Bullet" |  "Blitz" | "Rapid" | "Daily";

export interface Match {
    match_id: string;
    match: MatchInfo;
}
export interface MatchInfo {
    challenger: string;
    opponent: string;
    board: string;
    state: MatchState;
    nonce: number;
    style: MatchStyle
    lastMove: number;
    start: number;
    betAssetId: string; 
    betAmount: BN;
}