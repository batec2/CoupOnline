import Actions from "./gameActions/actions";
import PlayerCards from "./gameCards/playerCards";

const Game = () => {
  return (
    <div>
      <h1>Game</h1>
      <PlayerCards></PlayerCards>
      <Actions></Actions>
    </div>
  );
};

export default Game;
