import GameActions from "@/lib/actionEnum";
import { handleNormalAction } from "../../../actions/socketActions";
import { Button } from "../../ui/button";
import useGameContext from "@/context/useGameContext";
import TargetAction from "./targetAction";
import { useState } from "react";
import GameCard from "@/lib/cardEnum";
import ActionButton from "./actionButton.component";
import ButtonClass from "@/lib/buttonClassEnum";

const NormalActions = () => {
  const { socket, roomId, coins, gameCards } = useGameContext();
  const [showTarget, setShowTarget] = useState(false);
  const [currentAction, setAction] = useState(null);


  //Determine button functionality based on game state
  const buttonClass = (button) => {
    //Have > 10 coins -> must coup
    if(coins >= 10 && button != GameActions.Coup) {
      return ButtonClass.Unavailable;
    }
    switch(button){
      //Have >= 6 coins -> can coup
      case GameActions.Coup:{
         if(coins >= 7) {
          return ButtonClass.Normal;
         } else {
          return ButtonClass.Unavailable;
         }
      }
      //Can always declare income or foreign aid
      case GameActions.Income || GameActions.Aid:{
        return ButtonClass.Normal;
      }
      //Taxes are legit if have duke, bluff if not
      case GameActions.Taxes: {
        if(gameCards[0] == GameCard.Duke || gameCards[1] == GameCard.Duke) {
          return ButtonClass.HaveCard;
        } else {
          return ButtonClass.Bluff;
        }
      }
      //Exchange is legit if have ambassador, bluff if not
      case GameActions.Exchange: {
        if(gameCards[0] == GameCard.Ambassador 
           || gameCards[1] == GameCard.Ambassador) {
          return ButtonClass.HaveCard;
        } else {
          return ButtonClass.Bluff;
        }
      }
      //Assassination is legit with assassin and >= 3 coins, bluff if not
      case GameActions.Assassinate: {
        if(coins < 3) {
          return ButtonClass.Unavailable;
        } else if(gameCards[0] == GameCard.Assassin 
                  || gameCards[1] == GameCard.Assassin) {
          return ButtonClass.HaveCard;
        } else {
          return ButtonClass.Bluff;
        }
      }
      //Steal is legit with captain, bludd if not
      case GameActions.Steal: {
        if(gameCards[0] == GameCard.Captain 
           || gameCards[1] == GameCard.Captain) {
          return ButtonClass.HaveCard;
        } else {
          return ButtonClass.Bluff;
        }
      }
    }
  }

  const onIncomeClick = () => {
    handleNormalAction(socket, roomId, GameActions.Income);
    setShowTarget(false);
    setAction(GameActions.Income);
  }

  const onCoupClick = () => {
    setShowTarget(true);
    setAction(GameActions.Coup);
  }

  const onTaxClick = () => {
    handleNormalAction(socket, roomId, GameActions.Taxes);
    setAction(GameActions.Taxes);
  }

  const onExchangeClick = () => {
    handleNormalAction(socket, roomId, GameActions.Exchange);
    setShowTarget(false);
    setAction(GameActions.Exchange);
  }

  const onAidClick = () => {
    handleNormalAction(socket, roomId, GameActions.Aid);
    setShowTarget(false);
    setAction(GameActions.Aid);
  }

  const onAssassinateClick = () => {
    handleNormalAction(socket, roomId, GameActions.Assassinate);
    setShowTarget(true);
    setAction(GameActions.Assassinate);
  }

  const onStealClick = () => {
    handleNormalAction(socket, roomId, GameActions.Steal);
    setShowTarget(true);
    setAction(GameActions.Steal);
  }

  return (
    <div className="flex flex-col space-x-2 space-y-2">
      <p>Actions:</p>
      <div className="flex flex-row space-x-2">
        <ActionButton
          buttonClass={buttonClass(GameActions.Income)}
          onClick={onIncomeClick}
          text={"Income"}
        />
        <ActionButton
          buttonClass={buttonClass(GameActions.Coup)}
          onClick={onCoupClick}
          text={"Coup"}
        />
        <ActionButton
          buttonClass={buttonClass(GameActions.Assassinate)}
          onClick={onAssassinateClick}
          text={"Assassinate"}
        />
        <ActionButton
          buttonClass={buttonClass(GameActions.Steal)}
          onClick={onStealClick}
          text={"Steal"}
        />
      </div>
      <div className="flex flex-row space-x-2">
        <ActionButton
          buttonClass={buttonClass(GameActions.Aid)}
          onClick={onAidClick}
          text={"Foreign Aid"}
        />
        <ActionButton
          buttonClass={buttonClass(GameActions.Taxes)}
          onClick={onTaxClick}
          text={"Taxes"}
        />
        <ActionButton
          buttonClass={buttonClass(GameActions.Exchange)}
          onClick={onExchangeClick}
          text={"Exchange Influence"}
        />
      </div>
      {showTarget ? (
        <div>
          <h1>Targets:</h1>
        </div>
      ) : <></>}
      {showTarget ? (
          <div className="flex flex-row">
            <TargetAction
              showTarget={showTarget}
              action={currentAction}
            ></TargetAction>
          </div>
      ) : <></>}
    </div>  
  );
};

export default NormalActions;
