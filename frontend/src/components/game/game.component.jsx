import NormalActions from "../gameActions/normalActions";
import ResponseActions from "../gameActions/responseActions";

const GameComponent = ({ socket, turnId, roomId, responseAction }) => {
  const handleTurn = (turnId) => {
    if (socket.id === turnId) {
      return <NormalActions socket={socket} roomId={roomId}></NormalActions>;
    } else if (responseAction) {
      return (
        <ResponseActions
          socket={socket}
          roomId={roomId}
          responseAction={responseAction}
        ></ResponseActions>
      );
    }
    return <h2>Not your turn bro</h2>;
  };
  return (
    <div>
      <h1>Game</h1>
      {handleTurn(turnId)}
    </div>
  );
};

export default GameComponent;
