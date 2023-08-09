import { ExtrinsicResult } from "../../types/apiTypes";
import {  displayError } from "../../utils/messages";

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


export { checkCreateMatchForm, checkJoinMatchForm}