import { handleNormalAction } from "@/components/game/socketActions";
import { Button } from "@/components/ui/button";
import useGameContext from "@/context/useGameContext";

/**
 * Generates collection of buttons for players that can be targeted by a normal
 * or response action
 * @param {*} param0 
 * @returns React UI element containing a button for each targetable players
 */
const TargetAction = ({ action }) => {
  const {
    socket,
    roomId,
    currentLobbyMembers,
    setTurnId,
    setInitialAction,
    setInitialUserId,
    playerCardCount,
    setTargetId
  } = useGameContext();

  const buttons = [];
  Object.keys(currentLobbyMembers).forEach((member) => {
    if (member === socket.current.id
        || playerCardCount[member] === 0) {
      return;
    }
    buttons.push(
      <Button
        className="w-40"
        onClick={() => {
          handleNormalAction(socket.current, roomId, action, member);
          setTargetId(member);
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
