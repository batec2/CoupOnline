import useGameContext from "@/context/useGameContext";
import Actions from "./gameActions/actions";
import PlayerCards from "./gameCards/playerCards";

const Game = () => {
  const { coins } = useGameContext();
  return (
    <div>
      <h1>Game</h1>
      <p>Your Coins: {coins}</p>
      <PlayerCards></PlayerCards>
      <Actions></Actions>
    </div>
  );
};

export default Game;
