import GameActions from "@/lib/actionEnum.js";
import useGameContext from "@/context/useGameContext.js";
import { handleResponseAction } from "@/components/game/socketActions.js";
import GameCard from "@/lib/cardEnum.js";
import ButtonClass from "@/lib/buttonClassEnum.js";
import ActionButton from "./actionButton.component.jsx";
import ActionTimeout from "./actionTimeout.component.jsx";

/**
 * Generates collection of buttons for actions a player can take on in response
 * to an action declared during another player's turn
 * @returns React UI element with collection of buttons
 */
const ResponseActions = () => {
  const {
    socket,
    roomId,
    initialAction,
    gameCards,
    responseInitialAction,
    setResponseInitialAction,
    setResponseInitialId,
    setResponseSecondaryAction,
    setResponseSecondaryId,
    setIsResponding,
    isTarget,
  } = useGameContext();

  console.log(isTarget);
  //Detemines button colour based on whether player has appropriate card or not
  const buttonClass = (button) => {
    switch (button) {
      case GameActions.CalloutLie: {
        return ButtonClass.Callout;
      }
      case GameActions.BlockAid: {
        if (gameCards[0] == GameCard.Duke || gameCards[1] == GameCard.Duke) {
          return ButtonClass.HaveCard;
        } else {
          return ButtonClass.Bluff;
        }
      }
      case GameActions.BlockStealAsAmbass: {
        if (
          gameCards[0] == GameCard.Ambassador ||
          gameCards[1] == GameCard.Ambassador
        ) {
          return ButtonClass.HaveCard;
        } else {
          return ButtonClass.Bluff;
        }
      }
      case GameActions.BlockStealAsCaptain: {
        if (
          gameCards[0] == GameCard.Captain ||
          gameCards[1] == GameCard.Captain
        ) {
          return ButtonClass.HaveCard;
        } else {
          return ButtonClass.Bluff;
        }
      }
      case GameActions.BlockAssassinate: {
        if (
          gameCards[0] == GameCard.Contessa ||
          gameCards[1] == GameCard.Contessa
        ) {
          return ButtonClass.HaveCard;
        } else {
          return ButtonClass.Bluff;
        }
      }
      default: {
        return ButtonClass.Normal;
      }
    }
  };

  const onResponseClick = (gameAction) => {
    setIsResponding(false);
    handleResponseAction(socket.current, roomId, gameAction);
    if(gameAction !== GameActions.Pass) { 
      setTimeout(()=> { //Wait to see if an earlier response was received
        if(responseInitialId === null) { //No initial response yet - set to initial response
          setResponseInitialId(socket.current);
          setResponseInitialAction(gameAction);
        } else if(responseSecondaryId === null) {
          setResponseInitialId(socket.current);
          setResponseSecondaryAction(gameAction);
        }
      },500)
    }
  };

  const canCallout = () => {
    if (initialAction == GameActions.Aid && responseInitialAction == null) {
      return false;
    } else {
      return true;
    }
  };

  // Assassinate can only be blocked by the target
  const canBlockAssassinate = () => {
    if (
      initialAction == GameActions.Assassinate &&
      responseInitialAction == null &&
      isTarget
    ) {
      return true;
    } else {
      return false;
    }
  };
  // Steal can only be blocked by the target
  const canBlockSteal = () => {
    if (
      initialAction == GameActions.Steal &&
      responseInitialAction == null &&
      isTarget
    ) {
      return true;
    } else {
      return false;
    }
  };
  const canBlockAid = () => {
    if (initialAction == GameActions.Aid && responseInitialAction == null) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div>
      <div className="space-x-2 space-y-2">
        {canCallout() ? (
          <ActionButton
            buttonClass={ButtonClass.Callout}
            onClick={() => onResponseClick(GameActions.CalloutLie)}
            text={"Callout Lie"}
          />
        ) : (
          <></>
        )}
        {canBlockAssassinate() ? (
          <ActionButton
            buttonClass={buttonClass(GameActions.BlockAssassinate)}
            onClick={() => onResponseClick(GameActions.BlockAssassinate)}
            text={"Block Assassinate"}
          />
        ) : (
          <></>
        )}
        {canBlockAid() ? (
          <ActionButton
            buttonClass={buttonClass(GameActions.BlockAid)}
            onClick={() => onResponseClick(GameActions.BlockAid)}
            text={"Block Aid"}
          />
        ) : (
          <></>
        )}
        {canBlockSteal() ? (
          <>
            <ActionButton
              buttonClass={buttonClass(GameActions.BlockStealAsAmbass)}
              onClick={() => onResponseClick(GameActions.BlockStealAsAmbass)}
              text={"Block Steal as Ambassador"}
            />
            <ActionButton
              buttonClass={buttonClass(GameActions.BlockStealAsCaptain)}
              onClick={() => onResponseClick(GameActions.BlockStealAsCaptain)}
              text={"Block Steal as Captain"}
            />
          </>
        ) : (
          <></>
        )}
        <ActionButton
          buttonClass={ButtonClass.Normal}
          onClick={() => onResponseClick(GameActions.Pass)}
          text={"Pass"}
        />
      </div>
      <ActionTimeout callback={() => onResponseClick(GameActions.Pass)} />
    </div>
  );
};

export default ResponseActions;
