import { QueryableStorage } from '@polkadot/api/types';
import { StorageKey } from '@polkadot/types';
import { Option } from '@polkadot/types-codec';
import type { } from '@polkadot/types/lookup';
import { Match, MatchInfo, MatchState, MatchStyle } from '../types/chessTypes';

function parseState(matchState: any): MatchState {
  let state = matchState;
  if(matchState.isOnGoing == undefined) {
    state = JSON.parse(JSON.stringify(matchState));
  }
  if(state.isOnGoing && state.asOnGoing.isWhites){
    return 'Whites' as MatchState;
  }
  if(state.isOnGoing && state.asOnGoing.isBlacks){
    return 'Blacks' as MatchState;
  }
  if(state.OnGoing === 'Whites'){
    return 'Whites' as MatchState;
  }
  if(state.OnGoing === 'Blacks'){
    return 'Blacks' as MatchState;
  }
  return state.toString() as MatchState;
}
function parseMatch(
  matchData: any
  ): MatchInfo {
    return {
        challenger: matchData.challenger.toString(),
        opponent: matchData.opponent.toString(),
        board: matchData.board.toHuman(),
        state: parseState(matchData.state),
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
      if(matchInfo.challenger === userAccount || (matchInfo.opponent === userAccount && matchInfo.state !== 'AwaitingOpponent')){
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

  function parseAwaitingMatches(
    matches: [
      StorageKey<[any]>,
      Option<any>
    ][], userAccount: String
  ): Match[] {
    const userMatches: Match[] = [];
    matches.map((matchData) => {
      const key = matchData[0].args[0];
      const matchInfo = parseMatch(matchData[1].unwrap());
      if(matchInfo.challenger === userAccount || (matchInfo.opponent === userAccount && matchInfo.state === 'AwaitingOpponent')){
        userMatches.push({match_id: key.toString(), match: matchInfo});
      }
    });
    return userMatches;
  }

  export async function getAwaitingUserMatches(api: {
    query: QueryableStorage<'promise'>;
  }, userAccount: String): Promise<Match[]> {
    return parseAwaitingMatches(await api.query.chess.matches.entries(), userAccount);
  }


  function parseIndividualMatchResponse(match_id: string, response: any): Match {
    const match: Match = {
      match_id, 
      match: {
        challenger: response.challenger.toString(),
        opponent: response.opponent.toString(),
        board: response.board,
        state: parseState(response.state),
        nonce: response.nonce,
        style: response.style.toString() as MatchStyle,
        lastMove: response.lastMove,
        start: response.start,
        betAssetId: response.betAssetId,
        betAmount: response.betAmount,
      } as MatchInfo
    }
    return match;
  }

  export async function getMatch(api: {
    query: QueryableStorage<'promise'>;
  }, hash: string): Promise<Match | null> {
    const response = await api.query.chess.matches(hash);
    if(response.isEmpty){
      return null;
    }
    return parseIndividualMatchResponse(hash, response.toHuman());
  }