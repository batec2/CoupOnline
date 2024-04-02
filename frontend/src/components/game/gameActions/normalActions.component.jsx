import GameActions from "@/lib/actionEnum";
import { handleNormalAction } from "../socketActions";
import useGameContext from "@/context/useGameContext";
import TargetAction from "./targetAction.component";
import { useRef, useState } from "react";
import GameCard from "@/lib/cardEnum";
import ActionButton from "./actionButton.component";
import ButtonClass from "@/lib/buttonClassEnum";

const NormalActions = () => {
  const { socket, roomId, coins, gameCards, setTurnId } = useGameContext();
  const [showTarget, setShowTarget] = useState(false);
  const actionRef = useRef(null);

  //Determine button functionality based on game state
  const buttonClass = (button) => {
    //Have > 10 coins -> must coup
    if (coins >= 10 && button != GameActions.Coup) {
      return ButtonClass.Unavailable;
    }
    switch (button) {
      //Have >= 6 coins -> can coup
      case GameActions.Coup: {
        if (coins >= 7) {
          return ButtonClass.Normal;
        } else {
          return ButtonClass.Unavailable;
        }
      }
      //Can always declare income or foreign aid
      case GameActions.Income: {
        return ButtonClass.Normal;
      }
      case GameActions.Aid: {
        return ButtonClass.Normal;
      }
      //Taxes are legit if have duke, bluff if not
      case GameActions.Taxes: {
        if (gameCards[0] == GameCard.Duke || gameCards[1] == GameCard.Duke) {
          return ButtonClass.HaveCard;
        } else {
          return ButtonClass.Bluff;
        }
      }
      //Exchange is legit if have ambassador, bluff if not
      case GameActions.Exchange: {
        if (
          gameCards[0] == GameCard.Ambassador ||
          gameCards[1] == GameCard.Ambassador
        ) {
          return ButtonClass.HaveCard;
        } else {
          return ButtonClass.Bluff;
        }
      }
      //Assassination is legit with assassin and >= 3 coins, bluff if not
      case GameActions.Assassinate: {
        if (coins < 3) {
          return ButtonClass.Unavailable;
        } else if (
          gameCards[0] == GameCard.Assassin ||
          gameCards[1] == GameCard.Assassin
        ) {
          return ButtonClass.HaveCard;
        } else {
          return ButtonClass.Bluff;
        }
      }
      //Steal is legit with captain, bludd if not
      case GameActions.Steal: {
        if (
          gameCards[0] == GameCard.Captain ||
          gameCards[1] == GameCard.Captain
        ) {
          return ButtonClass.HaveCard;
        } else {
          return ButtonClass.Bluff;
        }
      }
    }
  };

  const onIncomeClick = () => {
    handleNormalAction(socket.current, roomId, GameActions.Income, null);
    setTurnId(null);
    setShowTarget(false);
  };

  const onCoupClick = () => {
    actionRef.current = GameActions.Coup;
    setShowTarget(true);
  };

  const onAssassinateClick = () => {
    actionRef.current = GameActions.Assassinate;
    setShowTarget(true);
  };

  const onStealClick = () => {
    actionRef.current = GameActions.Steal;
    setShowTarget(true);
  };

  const onTaxClick = () => {
    handleNormalAction(socket.current, roomId, GameActions.Taxes, null);
    setTurnId(null);
    setShowTarget(false);
  };

  const onExchangeClick = () => {
    handleNormalAction(socket.current, roomId, GameActions.Exchange, null);
    setTurnId(null);
    setShowTarget(false);
  };

  const onAidClick = () => {
    handleNormalAction(socket.current, roomId, GameActions.Aid, null);
    setTurnId(null);
    setShowTarget(false);
  };

  return (
    <div className="flex flex-col space-x-2 space-y-2">
      <p>Actions:</p>
      <div className="flex flex-row space-x-2">
        <ActionButton
          buttonClass={buttonClass(GameActions.Income)}
          onClick={() => onIncomeClick()}
          text={"Income"}
        />
        <ActionButton
          buttonClass={buttonClass(GameActions.Coup)}
          onClick={() => onCoupClick()}
          text={"Coup"}
        />
        <ActionButton
          buttonClass={buttonClass(GameActions.Assassinate)}
          onClick={() => onAssassinateClick()}
          text={"Assassinate"}
        />
        <ActionButton
          buttonClass={buttonClass(GameActions.Steal)}
          onClick={() => onStealClick()}
          text={"Steal"}
        />
      </div>
      <div className="flex flex-row space-x-2">
        <ActionButton
          buttonClass={buttonClass(GameActions.Aid)}
          onClick={() => onAidClick()}
          text={"Foreign Aid"}
        />
        <ActionButton
          buttonClass={buttonClass(GameActions.Taxes)}
          onClick={() => onTaxClick()}
          text={"Taxes"}
        />
        <ActionButton
          buttonClass={buttonClass(GameActions.Exchange)}
          onClick={() => onExchangeClick()}
          text={"Exchange Influence"}
        />
      </div>
      {showTarget ? (
        <>
          <div className="space-y-8 space-x-2">
            <h1>Targets:</h1>
          </div>
          <div className="flex flex-row space-y-2 space-x-2">
            <TargetAction action={actionRef.current}></TargetAction>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default NormalActions;
