import useGameContext from "@/context/useGameContext";
import NormalActions from "./normalActions.component";
import ResponseActions from "./responseActions.component";

const Actions = () => {
  const { socket, isResponding, currentTurnId, isTarget } = useGameContext();
  if (socket.current.id === currentTurnId && !isTarget) {
    return <NormalActions></NormalActions>;
  } else if (isResponding) {
    return <ResponseActions></ResponseActions>;
  }
  return <h2>Not your turn bro</h2>;
};

export default Actions;
