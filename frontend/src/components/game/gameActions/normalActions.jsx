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

  //Button conditional stylings
  const normal = "bg-actions-normal";
  const unavailable = "bg-actions-unavailable";
  const haveCard = "bg-actions-haveCard";
  const bluff = "bg-actions-bluff";

  //Determine
  const buttonClass = (button) => {
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
          className={buttonClass(GameActions.Income)}
          onClick={() => {
            if(buttonClass(GameActions.Income) != unavailable) {
              handleNormalAction(socket, roomId, GameActions.Income);
              setShowTarget(false);
              setAction(GameActions.Income);
            }
          }}
        >
          Income
        </Button>

        <Button
          className={buttonClass(GameActions.Coup)}
          onClick={() => {
            // handleNormalAction(socket, roomId, GameActions.Coup);
            if (buttonClass(GameActions.Coup) != unavailable) {
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
          className={buttonClass(GameActions.Taxes)}
          onClick={() => {
            if (buttonClass(GameActions.Taxes) != unavailable) {
              handleNormalAction(socket, roomId, GameActions.Taxes);
              setAction(GameActions.Taxes);
            }
          }}
        >
          Taxes
        </Button>
        
        <Button
          className={buttonClass(GameActions.Exchange)}
          onClick={() => {
            if(buttonClass(GameActions.Exchange) != unavailable) {
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
          className={buttonClass(GameActions.Aid)}
          onClick={() => {
            if(buttonClass(GameActions.Aid) != unavailable) {
              handleNormalAction(socket, roomId, GameActions.Aid);
              setShowTarget(false);
              setAction(GameActions.Aid);
            }
          }}
        >
          Foreign Aid
        </Button>

        <Button
          className={buttonClass(GameActions.Assassinate)}
          onClick={() => {
            if(buttonClass(GameActions.Assassinate) != unavailable) {
              handleNormalAction(socket, roomId, GameActions.Assassinate);
              setShowTarget(true);
              setAction(GameActions.Assassinate);
            }
          }}
        >
          Assassinate
        </Button>
        <Button
          className={buttonClass(GameActions.Steal)}
          onClick={() => {
            if(buttonClass(GameActions.Steal) != unavailable) {
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
