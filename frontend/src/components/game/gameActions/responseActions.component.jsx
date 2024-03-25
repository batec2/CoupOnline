import GameActions from "@/lib/actionEnum.js";
import useGameContext from "@/context/useGameContext.js";
import { handleResponseAction } from "@/components/game/socketActions.js";
import GameCard from "@/lib/cardEnum.js";
import ButtonClass from "@/lib/buttonClassEnum.js";
import ActionButton from "./actionButton.component.jsx";

/**
 *
 * @param {*} param0
 * @returns
 */
const ResponseActions = () => {
  const {
    socket,
    roomId,
    initialAction,
    initialUserId,
    gameCards,
    responseAction,
    responseIdRef,
    setIsResponding,
  } = useGameContext();

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
    // setIsResponding(false);
    handleResponseAction(
      socket,
      roomId,
      initialUserId,
      initialAction,
      gameAction,
      responseIdRef.current,
      responseAction
    );
  };

  const handleDisplayedAction = (action) => {
    switch (action) {
      case GameActions.Assassinate: {
        return (
          <ActionButton
            buttonClass={buttonClass(GameActions.BlockAssassinate)}
            onClick={() => onResponseClick(GameActions.BlockAssassinate)}
            text={"Block Assassinate"}
          ></ActionButton>
        );
      }
      case GameActions.Aid: {
        return (
          <ActionButton
            buttonClass={buttonClass(GameActions.BlockAid)}
            onClick={() => onResponseClick(GameActions.BlockAid)}
            text={"Block Aid"}
          ></ActionButton>
        );
      }
      case GameActions.Steal: {
        return (
          <>
            <ActionButton
              buttonClass={buttonClass(GameActions.BlockStealAsAmbass)}
              onClick={() => onResponseClick(GameActions.BlockStealAsAmbass)}
              text={"Block Steal as Ambassador"}
            ></ActionButton>
            <ActionButton
              buttonClass={buttonClass(GameActions.BlockStealAsCaptain)}
              onClick={() => onResponseClick(GameActions.BlockStealAsCaptain)}
              text={"Block Steal as Captain"}
            ></ActionButton>
          </>
        );
      }
    }
  };

  return (
    <div>
      <h1>{JSON.stringify(initialAction)}</h1>
      <div>
        {handleDisplayedAction(initialAction)}
        {initialAction != GameActions.Aid ? (
          <ActionButton
            buttonClass={ButtonClass.Callout}
            onClick={() => onResponseClick(GameActions.CalloutLie)}
            text={"Callout Lie"}
          />
        ) : (
          <></>
        )}
        <ActionButton
          buttonClass={ButtonClass.Normal}
          onClick={() => onResponseClick(GameActions.Pass)}
          text={"Pass"}
        ></ActionButton>
      </div>
    </div>
  );
};

export default ResponseActions;