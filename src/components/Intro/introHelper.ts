import { ExtrinsicResult } from "../../types/apiTypes";
import { displaySuccess, displayError } from "../../utils/errors";

function checkCreateMatchForm(addressRival: string, checkBoxSelected: number){
    if(addressRival === ""){
        displayError("The address of your rival is missing");
        return;
    }
    if(checkBoxSelected === -1){
        displayError("Select the type of match you want to play");
        return;
    }
}

function checkJoinMatchForm(matchId: string,){
    if(matchId === ""){
        displayError("Insert a match Id to join the match");
        return;
      }
}

function displayResultExtrinsicMessage(result: ExtrinsicResult){
    if(result.success){
        displaySuccess(result.message);
    }else{
        displayError(result.message);
    }
}

export { checkCreateMatchForm, checkJoinMatchForm, displayResultExtrinsicMessage}