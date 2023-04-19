import { BoardOrientation } from "react-chessboard/dist/chessboard/types";
import { MatchInfo, MatchState } from "../../types/chessTypes";

export function boardOrientation(match: MatchInfo, myAddress: string): BoardOrientation {
    if(myAddress === match.opponent){
     return 'black';
    }
    return 'white';
 }

export function isMyTurn(match: MatchInfo, myAddress: string): boolean {
   if(match.state === 'Whites' && myAddress === match.challenger){
    return true;
   }
   if(match.state === 'Blacks' && myAddress === match.opponent){
    return true;
   }
   return false;
}

export function statusMsg(match: MatchInfo, myAddress: string): string {
    const status = match.state;
    if(status == 'AwaitingOpponent'){
        return "Awaiting your opponent to accept";
    }
    if (status === 'Drawn'){
        return "Match has ended with a drawn";
    }
    if (status === 'Won'){
        return "Match has ended with victory";
    }
    if(isMyTurn(match, myAddress)){
        return "Your turn to move"; 
    }
    return "Waiting your opponent to move";
    
 }
 export function matchHasStarted(match: MatchInfo): boolean {
    const status = match.state;
    if(status == 'AwaitingOpponent'){
        return false;
    }
    return true;    
 }