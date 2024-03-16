import GameActions from "@/lib/actionEnum.js";
import NormalActions from "../gameActions/normalActions";
import ResponseActions from "../gameActions/responseActions";
import CalledOutActions from "../gameActions/calledOutActions";

const GameComponent = ({ socket, turnId, roomId, cards, responseAction }) => {
  console.log(responseAction);
  const handleTurn = (turnId) => {
    if (socket.id === turnId) {
      return <NormalActions socket={socket} roomId={roomId}></NormalActions>;
    } else if (
      responseAction &&
      responseAction.action !== GameActions.CalloutLie
    ) {
      return (
        <ResponseActions
          socket={socket}
          roomId={roomId}
          responseAction={responseAction}
        ></ResponseActions>
      );
    } else if (
      responseAction &&
      responseAction.action === GameActions.CalloutLie
    ) {
      return (
        <CalledOutActions
          socket={socket}
          roomId={roomId}
          cards={cards}
        ></CalledOutActions>
      );
    }
    return <h2>Not your turn bro</h2>;
  };

  const handleCards = (cards) => {
    if (cards) {
      return <div>Your Cards are {JSON.stringify(cards)}</div>;
    }
    return <div>You have no cards</div>;
  };

  return (
    <div>
      <h1>Game</h1>
      {handleCards(cards)}
      {handleTurn(turnId)}
    </div>
  );
};

export default GameComponent;
