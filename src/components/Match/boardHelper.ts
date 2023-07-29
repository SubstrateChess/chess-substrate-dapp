import { BoardOrientation } from "react-chessboard/dist/chessboard/types";
import { PieceColor, PieceType} from "chess.js";
import { MatchInfo } from "../../types/chessTypes";
import { ExtrinsicResult } from "../../types/apiTypes";
import { displayError } from "../../utils/messages";


function boardOrientation(match: MatchInfo, myAddress: string): BoardOrientation {
    if(myAddress === match.opponent){
     return 'black';
    }
    return 'white';
}
function getPieceType (piece: string): PieceType {
    return Array.from(piece)[1] as PieceType;
}
function getPieceColor (piece: string): PieceColor {
    return Array.from(piece)[0] as PieceColor;
}

function isMyPiece(match: MatchInfo, myAddress: string, piece: PieceColor): boolean {
    if(myAddress === match.opponent){
        if (piece === 'b'){
            return true;
        }
        return false;
    }
    if(myAddress === match.challenger){
        if (piece === 'w'){
            return true;
        }
        return false;
    }
    return false;
 }

function isMyTurn(match: MatchInfo, myAddress: string): boolean {
   if(match.state === 'Whites' && myAddress === match.challenger){
    return true;
   }
   if(match.state === 'Blacks' && myAddress === match.opponent){
    return true;
   }
   return false;
}

function statusMsg(match: MatchInfo, myAddress: string): string {
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
function matchHasStarted(match: MatchInfo): boolean {
    const status = match.state;
    if(status == 'AwaitingOpponent'){
        return false;
    }
    return true;    
 }

 function displayErrorExtrinsic(result: ExtrinsicResult){
    if(!result.success){
        displayError(result.message);
    }
}

export{boardOrientation, getPieceType, getPieceColor, isMyPiece, isMyTurn,statusMsg, matchHasStarted, displayErrorExtrinsic }