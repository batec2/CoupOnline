import useGameContext from "@/context/useGameContext";
import NormalActions from "./normalActions";
import ResponseActions from "./responseActions";
import GameActions from "@/lib/actionEnum";

const Actions = () => {
  const { socket, initialAction, currentTurnId, isTarget } = useGameContext();
  if (socket.id === currentTurnId && !isTarget) {
    return <NormalActions></NormalActions>;
  } else if (initialAction && initialAction !== GameActions.CalloutLie) {
    console.log("initial action: " + initialAction);
    return <ResponseActions></ResponseActions>;
  }
  return <h2>Not your turn bro</h2>;
};

export default Actions;
