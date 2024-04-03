import useGameContext from "@/context/useGameContext";
import NormalActions from "./normalActions.component";
import ResponseActions from "./responseActions.component";

/**
 * React UI element that conditionally shows the current actions available
 * @returns Current Actions React Component
 */
const Actions = () => {
  const { socket, isResponding, currentTurnId, isChoosing, playerCardCount } = useGameContext();
  if (socket.current.id === currentTurnId && !isChoosing) {
    return <NormalActions></NormalActions>;
  } else if (playerCardCount[socket.current.id] === 0) {
    return <h2>You're dead homie</h2>
  } else if (isResponding) {
    return <ResponseActions></ResponseActions>;
  } else { return <h2>Not your turn bro</h2>; }
};

export default Actions;
