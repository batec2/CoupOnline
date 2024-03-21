import GameActions from "@/lib/actionEnum.js";
import BlockButtons from "../../blockButtons/blockButtons.jsx";
import useGameContext from "@/context/useGameContext.js";
import { Button } from "@/components/ui/button.jsx";
import { handleResponseAction } from "@/actions/socketActions.js";

/**
 *
 * @param {*} param0
 * @returns
 */
const ResponseActions = () => {
  const { socket, roomId, responseAction } = useGameContext();

  const handleDisplayedAction = (action) => {
    switch (action) {
      case GameActions.Assassinate: {
        return (
          <BlockButtons
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
            text={"Block Foreign Aid"}
            socket={socket}
            roomId={roomId}
            userId={responseAction.userId}
            action={GameActions.BlockStealAsAmbass}
          ></BlockButtons>
        );
      }
      case GameActions.Steal: {
        return (
          <>
            <BlockButtons
              text={"Block Steal as Ambassador"}
              socket={socket}
              roomId={roomId}
              userId={responseAction.userId}
              action={GameActions.BlockStealAsAmbass}
            ></BlockButtons>
            <BlockButtons
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
