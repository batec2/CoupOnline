import GameActions from "@/lib/actionEnum.js";
import { handleResponseAction } from "../../actions/socketActions.js";
import { Button } from "../ui/button";

const ResponseActions = ({ socket, roomId, responseAction }) => {
  return (
    <div>
      <h1>{JSON.stringify(responseAction)}</h1>
      <div>
        <Button
          onClick={() =>
            handleResponseAction(socket, roomId, GameActions.BlockAid)
          }
        >
          Block Foreign Aid
        </Button>
        <Button
          onClick={() =>
            handleResponseAction(socket, roomId, GameActions.BlockSteal)
          }
        >
          Block Stealing
        </Button>
        <Button
          onClick={() =>
            handleResponseAction(socket, roomId, GameActions.BlockAssassinate)
          }
        >
          Block Assassination
        </Button>
        <Button
          onClick={() =>
            handleResponseAction(socket, roomId, GameActions.CalloutLie)
          }
        >
          Callout Lie
        </Button>
      </div>
    </div>
  );
};

export default ResponseActions;
