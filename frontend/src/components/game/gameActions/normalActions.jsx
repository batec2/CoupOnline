import GameActions from "@/lib/actionEnum";
import { handleNormalAction } from "../../../actions/socketActions";
import { Button } from "../../ui/button";
import useGameContext from "@/context/useGameContext";
import TargetAction from "./targetAction";
import { useState } from "react";

const NormalActions = () => {
  const { socket, roomId } = useGameContext();
  const [showTarget, setShowTarget] = useState(false);

  return (
    <div className="space-y-2">
      <div className="space-x-4">
        <Button
          onClick={() => {
            handleNormalAction(socket, roomId, GameActions.Income);
            setShowTarget(false);
          }}
        >
          Income
        </Button>

        <Button
          onClick={() => {
            handleNormalAction(socket, roomId, GameActions.Coup);
            setShowTarget(true);
          }}
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
          onClick={() => {
            handleNormalAction(socket, roomId, GameActions.Exchange);
            setShowTarget(false);
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
          }}
        >
          Foreign Aid
        </Button>

        <Button
          onClick={() => {
            handleNormalAction(socket, roomId, GameActions.Assassinate);
            setShowTarget(true);
          }}
        >
          Assassinate
        </Button>
        <Button
          onClick={() => {
            handleNormalAction(socket, roomId, GameActions.Steal);
            setShowTarget(true);
          }}
        >
          Steal
        </Button>
      </div>
      <TargetAction showTarget={showTarget}></TargetAction>
    </div>
  );
};

export default NormalActions;
