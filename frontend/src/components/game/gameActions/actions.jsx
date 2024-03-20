import useGameContext from "@/context/useGameContext";
import NormalActions from "./normalActions";
import ResponseActions from "./responseActions";
import CalledOutActions from "./calledOutActions";
import GameActions from "@/lib/actionEnum";

const Actions = () => {
  const { socket, responseAction, currentTurnId, isTarget } = useGameContext();
  if (socket.id === currentTurnId && !isTarget) {
    return <NormalActions></NormalActions>;
  } else if (
    responseAction &&
    responseAction.action !== GameActions.CalloutLie
  ) {
    return <ResponseActions></ResponseActions>;
  } else if (
    responseAction &&
    responseAction.action === GameActions.CalloutLie
  ) {
    return <CalledOutActions></CalledOutActions>;
  }
  return <h2>Not your turn bro</h2>;
};

export default Actions;
