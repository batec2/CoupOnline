import GameActions from "@/lib/actionEnum.js";
import { handleResponseAction } from "../../actions/socketActions.js";
import { Button } from "../ui/button";
import BlockButtons from "../blockButtons/blockButtons.jsx";

/**
 *
 * @param {*} param0
 * @returns
 */
const ResponseActions = ({ socket, roomId, responseAction }) => {
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
        <BlockButtons
          text={"Callout Lie"}
          socket={socket}
          roomId={roomId}
          userId={responseAction.userId}
          action={GameActions.CalloutLie}
        ></BlockButtons>
      </div>
    </div>
  );
};

export default ResponseActions;
