import GameActions from "@/lib/actionEnum.js";
import BlockButtons from "../../blockButtons/blockButtons.jsx";
import useGameContext from "@/context/useGameContext.js";
import { Button } from "@/components/ui/button.jsx";
import { handleResponseAction } from "@/actions/socketActions.js";
import GameCard from "@/lib/cardEnum.js";

/**
 *
 * @param {*} param0
 * @returns
 */
const ResponseActions = () => {
  const { socket, roomId, responseAction, gameCards } = useGameContext();

  //Button conditional stylings
  const normal = "bg-actions-normal";
  const callout = "bg-actions-callout";
  const haveCard = "bg-actions-haveCard";
  const bluff = "bg-actions-bluff";
  
  //Detemines button colour based on whether player has appropriate card or not
  const buttonClass = (button) => {
    switch(button) {
      case GameActions.CalloutLie: {
        return callout;
      }
      case GameActions.BlockAid: {
        if(gameCards[0] == GameCard.Duke) {
          return haveCard;
        } else {
          return bluff;
        }
      }
      case GameActions.BlockStealAsAmbass: {
        if(gameCards[0] == GameCard.Ambassador) {
          return haveCard;
        } else {
          return bluff;
        }
      }
      case GameActions.BlockStealAsCaptain: {
        if(gameCards[0] == GameCard.Captain) {
          return haveCard;
        } else {
          return bluff;
        }
      }
      case GameActions.BlockAssassinate: {
        if(gameCards[0] == GameCard.Contessa) {
          return haveCard;
        } else {
          return bluff;
        }
      }
      default: {
        return normal;
      }
    }
  }

  const handleDisplayedAction = (action) => {
    switch (action) {
      case GameActions.Assassinate: {
        return (
          <BlockButtons
            className={buttonClass(GameActions.Assassinate)}
            text={"Block Asssassinate"}
            socket={socket}
            roomId={roomId}
            userId={responseAction.userId}
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
            userId={responseAction.userId}
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
              userId={responseAction.userId}
              action={GameActions.BlockStealAsAmbass}
            ></BlockButtons>
            <BlockButtons
              className={buttonClass(GameActions.BlockStealAsCaptain)}
              text={"Block Steal as Captain"}
              socket={socket}
              roomId={roomId}
              userId={responseAction.userId}
              action={GameActions.BlockStealAsCaptain}
            ></BlockButtons>
          </>
        );
      }
    }
  };

  return (
    <div>
      <h1>{JSON.stringify(responseAction)}</h1>
      <div>
        {handleDisplayedAction(responseAction.action)}
        <Button
          className={buttonClass(GameActions.CalloutLie)}
          onClick={() =>
            handleResponseAction(
              socket,
              roomId,
              responseAction.userId,
              responseAction.action,
              GameActions.CalloutLie
            )
          }
        >
          Callout Lie
        </Button>
        <Button
          onClick={() =>
            handleResponseAction(
              socket,
              roomId,
              responseAction.userId,
              responseAction.action,
              GameActions.Pass
            )
          }
        >
          Pass
        </Button>
      </div>
    </div>
  );
};

export default ResponseActions;
