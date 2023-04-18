import { QueryableStorage } from '@polkadot/api/types';
import { StorageKey } from '@polkadot/types';
import { Option } from '@polkadot/types-codec';
import type { } from '@polkadot/types/lookup';
import { Match, MatchInfo, MatchState, MatchStyle } from '../types/chessTypes';

function parseMatch(
  matchData: any
  ): MatchInfo {
    return {
        challenger: matchData.challenger.toString(),
        opponent: matchData.opponent.toString(),
        board: matchData.board.toHuman(),
        state: (matchData.state.OnGoing ? matchData.state.OnGoing.toString() : matchData.state.toString()) as MatchState,
        nonce: matchData.nonce.toNumber(),
        style: matchData.style.toString() as MatchStyle,
        lastMove: matchData.lastMove.toNumber(),
        start: matchData.start.toNumber(),
        betAssetId: matchData.betAssetId.toNumber(),
        betAmount: matchData.betAmount.toBn(),
    } as MatchInfo;
}

function parseMatches(
    matches: [
      StorageKey<[any]>,
      Option<any>
    ][], userAccount: String
  ): Match[] {
    const userMatches: Match[] = [];
    matches.map((matchData) => {
      const key = matchData[0].args[0];
      const matchInfo = parseMatch(matchData[1].unwrap());
      if(matchInfo.challenger === userAccount || matchInfo.opponent === userAccount){
        userMatches.push({match_id: key.toString(), match: matchInfo});
      }
    });
    return userMatches;
  }
  
  export async function getUserMatches(api: {
    query: QueryableStorage<'promise'>;
  }, userAccount: String): Promise<Match[]> {
    return parseMatches(await api.query.chess.matches.entries(), userAccount);
  }