import GameActions from "@/lib/actionEnum.js";
import BlockButtons from "../../blockButtons/blockButtons.jsx";
import useGameContext from "@/context/useGameContext.js";
import { handleResponseAction } from "@/actions/socketActions.js";
import GameCard from "@/lib/cardEnum.js";
import ButtonClass from "@/lib/buttonClassEnum.js";
import ActionButton from "./actionButton.component.jsx";

/**
 *
 * @param {*} param0
 * @returns
 */
const ResponseActions = () => {
  const { socket, roomId, initialAction, initialUserId, gameCards } =
    useGameContext();

  //Detemines button colour based on whether player has appropriate card or not
  const buttonClass = (button) => {
    switch (button) {
      case GameActions.CalloutLie: {
        return ButtonClass.Callout;
      }
      case GameActions.BlockAid: {
        if (gameCards[0] == GameCard.Duke) {
          return ButtonClass.HaveCard;
        } else {
          return ButtonClass.Bluff;
        }
      }
      case GameActions.BlockStealAsAmbass: {
        if (gameCards[0] == GameCard.Ambassador) {
          return ButtonClass.HaveCard;
        } else {
          return ButtonClass.Bluff;
        }
      }
      case GameActions.BlockStealAsCaptain: {
        if (gameCards[0] == GameCard.Captain) {
          return ButtonClass.HaveCard;
        } else {
          return ButtonClass.Bluff;
        }
      }
      case GameActions.BlockAssassinate: {
        if (gameCards[0] == GameCard.Contessa) {
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
    handleResponseAction(
      socket,
      roomId,
      initialUserId,
      initialAction,
      gameAction
    );
  };

  const handleDisplayedAction = (action) => {
    switch (action) {
      case GameActions.Assassinate: {
        return (
          <BlockButtons
            className={buttonClass(GameActions.Assassinate)}
            text={"Block Asssassinate"}
            socket={socket}
            roomId={roomId}
            userId={initialUserId}
            action={GameActions.BlockStealAsAmbass}
          ></BlockButtons>
        );
      }
      case GameActions.Aid: {
        return (
          <BlockButtons
            className={buttonClass(GameActions.BlockAid)}
            text={"Block Foreign Aid"}
            socket={socket}
            roomId={roomId}
            userId={initialUserId}
            action={GameActions.BlockAid}
          ></BlockButtons>
        );
      }
      case GameActions.Steal: {
        return (
          <>
            <BlockButtons
              className={buttonClass(GameActions.BlockStealAsAmbass)}
              text={"Block Steal as Ambassador"}
              socket={socket}
              roomId={roomId}
              userId={initialUserId}
              action={GameActions.BlockStealAsAmbass}
            ></BlockButtons>
            <BlockButtons
              className={buttonClass(GameActions.BlockStealAsCaptain)}
              text={"Block Steal as Captain"}
              socket={socket}
              roomId={roomId}
              userId={initialUserId}
              action={GameActions.BlockStealAsCaptain}
            ></BlockButtons>
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
        <ActionButton
          buttonClass={ButtonClass.Callout}
          onClick={() => onResponseClick(GameActions.CalloutLie)}
          text={"Callout Lie"}
        />
        <ActionButton
          buttonClass={ButtonClass.Normal}
          onClick={() => onResponseClick(GameActions.Pass)}
          text={"Pass"}
        />
      </div>
    </div>
  );
};

export default ResponseActions;
