import GameActions from "@/lib/actionEnum";
import { handleNormalAction } from "../../../actions/socketActions";
import { Button } from "../../ui/button";
import useGameContext from "@/context/useGameContext";

const NormalActions = () => {
  const { socket, roomId } = useGameContext();

  return (
    <div className="space-y-2">
      <div className="space-x-4">
        <Button
          onClick={() => handleNormalAction(socket, roomId, GameActions.Income)}
        >
          Income
        </Button>

        <Button
          onClick={() => handleNormalAction(socket, roomId, GameActions.Coup)}
        >
          Coup
        </Button>
      </div>

      <div className="space-x-4">
        <Button
          onClick={() => handleNormalAction(socket, roomId, GameActions.Taxes)}
        >
          Taxes
        </Button>
        <Button
          onClick={() =>
            handleNormalAction(socket, roomId, GameActions.Exchange)
          }
        >
          Exchange Influence
        </Button>
      </div>

      <div className="space-x-4">
        <Button
          onClick={() => handleNormalAction(socket, roomId, GameActions.Aid)}
        >
          Foreign Aid
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
      </div>
    </div>
  );
};

export default NormalActions;
