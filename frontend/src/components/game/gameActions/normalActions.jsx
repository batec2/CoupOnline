import GameActions from "@/lib/actionEnum";
import { handleNormalAction } from "../../../actions/socketActions";
import { Button } from "../../ui/button";
import useGameContext from "@/context/useGameContext";
import TargetAction from "./targetAction";
import { useState } from "react";
import GameCard from "@/lib/cardEnum";

const NormalActions = () => {
  const { socket, roomId, coins, gameCards } = useGameContext();
  const [showTarget, setShowTarget] = useState(false);
  const [currentAction, setAction] = useState(null);

  const mustCoup = () => {
    return coins >= 10;
  }
  const buttonColor = (button) => {
    if(coins >= 10 && button != GameActions.Coup) {
      return "bg-actions-unavailable";
    }
    switch(button){
      case GameActions.Coup:{
         if(coins > 6) {
          return "bg-actions-normal";
         }
         else {
          return "bg-actions-unavailable";
         }
      }
      case GameActions.Income || GameActions.Aid:{
        return "bg-actions-normal";
      }
      case GameActions.Taxes: {
        if(gameCards[0] == GameCard.Duke || gameCards[1] == GameCard.Duke) {
          return "bg-actions-haveCard"
        }
        else {
          return "bg-actions-bluff";
        }
      }
      case GameActions.Exchange: {
        if(gameCards[0] == GameCard.Ambassador || gameCards[1] == GameCard.Ambassador) {
          return "bg-actions-haveCard"
        }
        else {
          return "bg-actions-bluff";
        }
      }
      case GameActions.Assassinate: {
        if(coins < 3) {
          return "bg-actions-unavailable"
        }
        else if(gameCards[0] == GameCard.Assassin || gameCards[1] == GameCard.Assassin) {
          return "bg-actions-haveCard"
        }
        else {
          return "bg-actions-bluff";
        }
      }
      
      case GameActions.Steal: {
        if(gameCards[0] == GameCard.Captain || gameCards[1] == GameCard.Captain) {
          return "bg-actions-haveCard"
        }
        else {
          return "bg-actions-bluff";
        }
      }
    }
  }

  return (
    <div className="space-y-2">
      <div className="space-x-4">
        <Button
          className={buttonColor(GameActions.Income)}
          onClick={() => {
            handleNormalAction(socket, roomId, GameActions.Income);
            setShowTarget(false);
            setAction(GameActions.Income);
          }}
        >
          Income
        </Button>

        <Button
          className={coins>6 ? "bg-actions-normal" : "bg-actions-unavailable"}
          onClick={() => {
            // handleNormalAction(socket, roomId, GameActions.Coup);
            if (coins > 6) {
              setShowTarget(true);
              setAction(GameActions.Coup);
            }
          }}
        >
          Coup
        </Button>
      </div>

      <div className="space-x-4">
        <Button
          className={buttonColor(GameActions.Taxes)}
          onClick={() => {
            handleNormalAction(socket, roomId, GameActions.Taxes);
            setAction(GameActions.Taxes);
          }}
        >
          Taxes
        </Button>
        
        <Button
          className={buttonColor(GameActions.Exchange)}
          onClick={() => {
            handleNormalAction(socket, roomId, GameActions.Exchange);
            setShowTarget(false);
            setAction(GameActions.Exchange);
          }}
        >
          Exchange Influence
        </Button>
      </div>
       <div className="space-x-4">
        <Button
          className={buttonColor(GameActions.Aid)}
          onClick={() => {
            handleNormalAction(socket, roomId, GameActions.Aid);
            setShowTarget(false);
            setAction(GameActions.Aid);
          }}
        >
          Foreign Aid
        </Button>

        <Button
          className={buttonColor(GameActions.Assassinate)}
          onClick={() => {
            handleNormalAction(socket, roomId, GameActions.Assassinate);
            setShowTarget(true);
            setAction(GameActions.Assassinate);
          }}
        >
          Assassinate
        </Button>
        <Button
          className={buttonColor(GameActions.Steal)}
          onClick={() => {
            handleNormalAction(socket, roomId, GameActions.Steal);
            setShowTarget(true);
            setAction(GameActions.Steal);
          }}
        >
          Steal
        </Button>
      
      </div>
      <TargetAction
        showTarget={showTarget}
        action={currentAction}
      ></TargetAction>
    </div>
  );
};

export default NormalActions;
