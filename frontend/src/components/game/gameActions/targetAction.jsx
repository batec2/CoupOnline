import { handleNormalAction } from "@/actions/socketActions";
import { Button } from "@/components/ui/button";
import useGameContext from "@/context/useGameContext";

const TargetAction = ({ action }) => {
  const { socket, roomId, currentLobbyMembers, setTurnId } = useGameContext();
  const buttons = [];
  Object.keys(currentLobbyMembers).forEach((member) => {
    if (member === socket.id) {
      return;
    }
    buttons.push(
      <Button
        className="w-40"
        onClick={() => {
          handleNormalAction(socket, roomId, action, member);
          setTurnId(null);
        }}
        key={member}
      >
        {currentLobbyMembers[member].userId}
      </Button>
    );
  });

  return <div className="space-y-2 space-x-2">{buttons}</div>;
};

export default TargetAction;
