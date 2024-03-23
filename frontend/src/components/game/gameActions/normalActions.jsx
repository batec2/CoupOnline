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

  const normal = "bg-actions-normal";
  const unavailable = "bg-actions-unavailable";
  const haveCard = "bg-actions-haveCard";
  const bluff = "bg-actions-bluff";

  const buttonColor = (button) => {
    if(coins >= 10 && button != GameActions.Coup) {
      return unavailable;
    }
    switch(button){
      case GameActions.Coup:{
         if(coins > 6) {
          return normal;
         } else {
          return unavailable;
         }
      }
      case GameActions.Income || GameActions.Aid:{
        return normal;
      }
      case GameActions.Taxes: {
        if(gameCards[0] == GameCard.Duke || gameCards[1] == GameCard.Duke) {
          return haveCard;
        } else {
          return bluff;
        }
      }
      case GameActions.Exchange: {
        if(gameCards[0] == GameCard.Ambassador 
           || gameCards[1] == GameCard.Ambassador) {
          return haveCard;
        } else {
          return bluff;
        }
      }
      case GameActions.Assassinate: {
        if(coins < 3) {
          return unavailable;
        } else if(gameCards[0] == GameCard.Assassin 
                  || gameCards[1] == GameCard.Assassin) {
          return haveCard;
        } else {
          return bluff;
        }
      }
      
      case GameActions.Steal: {
        if(gameCards[0] == GameCard.Captain 
           || gameCards[1] == GameCard.Captain) {
          return haveCard;
        } else {
          return bluff;
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
            if(buttonColor(GameActions.Income) != unavailable) {
              handleNormalAction(socket, roomId, GameActions.Income);
              setShowTarget(false);
              setAction(GameActions.Income);
            }
          }}
        >
          Income
        </Button>

        <Button
          className={buttonColor(GameActions.Coup)}
          onClick={() => {
            // handleNormalAction(socket, roomId, GameActions.Coup);
            if (buttonColor(GameActions.Coup) != {unavailable}) {
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
            if (buttonColor(GameActions.Taxes) != unavailable) {
              handleNormalAction(socket, roomId, GameActions.Taxes);
              setAction(GameActions.Taxes);
            }
          }}
        >
          Taxes
        </Button>
        
        <Button
          className={buttonColor(GameActions.Exchange)}
          onClick={() => {
            if(buttonColor(GameActions.Exchange) != unavailable) {
              handleNormalAction(socket, roomId, GameActions.Exchange);
              setShowTarget(false);
              setAction(GameActions.Exchange);
            }
          }}
        >
          Exchange Influence
        </Button>
      </div>
       <div className="space-x-4">
        <Button
          className={buttonColor(GameActions.Aid)}
          onClick={() => {
            if(buttonColor(GameActions.Aid) != unavailable) {
              handleNormalAction(socket, roomId, GameActions.Aid);
              setShowTarget(false);
              setAction(GameActions.Aid);
            }
          }}
        >
          Foreign Aid
        </Button>

        <Button
          className={buttonColor(GameActions.Assassinate)}
          onClick={() => {
            if(buttonColor(GameActions.Assassinate) != unavailable) {
              handleNormalAction(socket, roomId, GameActions.Assassinate);
              setShowTarget(true);
              setAction(GameActions.Assassinate);
            }
          }}
        >
          Assassinate
        </Button>
        <Button
          className={buttonColor(GameActions.Steal)}
          onClick={() => {
            if(buttonColor(GameActions.Steal) != unavailable) {
              handleNormalAction(socket, roomId, GameActions.Steal);
              setShowTarget(true);
              setAction(GameActions.Steal);
            }
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
