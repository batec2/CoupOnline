import GameActions from "@/lib/actionEnum";
import { handleNormalAction } from "../../../actions/socketActions";
import { Button } from "../../ui/button";
import useGameContext from "@/context/useGameContext";
import TargetAction from "./targetAction";
import { useState } from "react";

const NormalActions = () => {
  const { socket, roomId } = useGameContext();
  const [showTarget, setShowTarget] = useState(false);
  const [currentAction, setAction] = useState(null);

  return (
    <div className="space-y-2">
      <div className="space-x-4">
        <Button
          onClick={() => {
            handleNormalAction(socket, roomId, GameActions.Income);
            setShowTarget(false);
            setAction(GameActions.Income);
          }}
        >
          Income
        </Button>

        <Button
          onClick={() => {
            // handleNormalAction(socket, roomId, GameActions.Coup);
            setShowTarget(true);
            setAction(GameActions.Coup);
          }}
        >
          Coup
        </Button>
      </div>

      {/* <div className="space-x-4">
        <Button
          onClick={() => {
            handleNormalAction(socket, roomId, GameActions.Taxes);
            setAction(GameActions.Taxes);
          }}
        >
          Taxes
        </Button>
        <Button
          onClick={() => {
            handleNormalAction(socket, roomId, GameActions.Exchange);
            setShowTarget(false);
            setAction(GameActions.Exchange);
          }}
        >
          Exchange Influence
        </Button>
      </div>

      <div className="space-x-4">
        <Button
          onClick={() => {
            handleNormalAction(socket, roomId, GameActions.Aid);
            setShowTarget(false);
            setAction(GameActions.Aid);
          }}
        >
          Foreign Aid
        </Button>

        <Button
          onClick={() => {
            handleNormalAction(socket, roomId, GameActions.Assassinate);
            setShowTarget(true);
            setAction(GameActions.Assassinate);
          }}
        >
          Assassinate
        </Button>
        <Button
          onClick={() => {
            handleNormalAction(socket, roomId, GameActions.Steal);
            setShowTarget(true);
            setAction(GameActions.Steal);
          }}
        >
          Steal
        </Button>
      </div>
        */}
      <TargetAction
        showTarget={showTarget}
        action={currentAction}
      ></TargetAction>
    </div>
  );
};

export default NormalActions;
