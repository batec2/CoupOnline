import useGameContext from "@/context/useGameContext";
import NormalActions from "./normalActions";
import ResponseActions from "./responseActions";

const Actions = () => {
  const { socket, isResponding, currentTurnId, isTarget } = useGameContext();
  if (socket.id === currentTurnId && !isTarget) {
    return <NormalActions></NormalActions>;
  } else if (isResponding) {
    return <ResponseActions></ResponseActions>;
  }
  return <h2>Not your turn bro</h2>;
};

export default Actions;
