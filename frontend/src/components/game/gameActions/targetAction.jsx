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
        onClick={() => handleTargetAction(socket, roomId, action, member)}
        key={member}
      >
        {member}
      </Button>
    );
  });

  return showTarget ? (
    <div>
      <h2>Targets</h2>
      {buttons}
    </div>
  ) : (
    <></>
  );
};

export default TargetAction;
