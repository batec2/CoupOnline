import { Button } from "@/components/ui/button";
import useGameContext from "@/context/useGameContext";
import { handleTargetAction } from "@/actions/socketActions";

const TargetAction = ({ showTarget, action }) => {
  const { socket, roomId, currentLobbyMembers } = useGameContext();
  const buttons = [];
  Object.keys(currentLobbyMembers).forEach((member) => {
    if (member === socket.id) {
      return;
    }
    buttons.push(
      <Button
        className="w-40"
        onClick={() => handleTargetAction(socket, roomId, action, member)}
        key={member}
      >
        {currentLobbyMembers[member].userId}
      </Button>
    );
  });

  return (
    <div className="space-y-2 space-x-2">
      {buttons}
    </div>
  );
};

export default TargetAction;
