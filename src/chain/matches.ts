import { QueryableConsts, QueryableStorage } from '@polkadot/api/types';
import { StorageKey } from '@polkadot/types';
import { Option } from '@polkadot/types-codec';
import { AccountId32 } from '@polkadot/types/interfaces';
import type { } from '@polkadot/types/lookup';
import { Match, MatchInfo, MatchState, MatchStyle } from '../types/chessTypes';

function toMatch(
    o: any
  ): MatchInfo {
    return {
        challenger: o.challenger.toString(),
        opponent: o.opponent.toString(),
        board: o.board.toHuman(),
        state: o.state.toString() as MatchState,
        nonce: o.nonce.toNumber(),
        style: o.style.toString() as MatchStyle,
        lastMove: o.lastMove.toNumber(),
        start: o.start.toNumber(),
        betAssetId: o.betAssetId.toNumber(),
        betAmount: o.betAmount.toBn(),
    } as MatchInfo;
}

function toUserMatch(
    matches: [
      StorageKey<[any]>,
      Option<any>
    ][], userAccount: String
  ): Match[] {
    const userMatches: Match[] = [];
    matches.map((o) => {
      const key = o[0].args[0];
      const matchInfo = toMatch(o[1].unwrap());
      if(matchInfo.challenger === userAccount || matchInfo.opponent === userAccount){
        userMatches.push({match_id: key.toString(), match: matchInfo});
      }
    });
    return userMatches;
  }
  
  export async function getUserMatches(api: {
    query: QueryableStorage<'promise'>;
  }, userAccount: String): Promise<Match[]> {
    return toUserMatch(await api.query.chess.matches.entries(), userAccount);
  }