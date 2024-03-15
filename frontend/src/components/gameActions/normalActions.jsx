import GameActions from "@/lib/actionEnum";
import { handleNormalAction } from "../../actions/socketActions";
import { Button } from "../ui/button";

const NormalActions = ({ socket, roomId }) => {
  return (
    <div>
      <Button
        onClick={() => handleNormalAction(socket, roomId, GameActions.Income)}
      >
        Income
      </Button>
      <Button
        onClick={() => handleNormalAction(socket, roomId, GameActions.Aid)}
      >
        Foreign Aid
      </Button>
      <Button
        onClick={() => handleNormalAction(socket, roomId, GameActions.Coup)}
      >
        Coup
      </Button>
      <Button
        onClick={() => handleNormalAction(socket, roomId, GameActions.Taxes)}
      >
        Taxes
      </Button>
      <Button
        onClick={() =>
          handleNormalAction(socket, roomId, GameActions.Assassinate)
        }
      >
        Assassinate
      </Button>
      <Button
        onClick={() => handleNormalAction(socket, roomId, GameActions.Steal)}
      >
        Steal
      </Button>
      <Button
        onClick={() => handleNormalAction(socket, roomId, GameActions.Exchange)}
      >
        Exchange Influence
      </Button>
    </div>
  );
};

export default NormalActions;
