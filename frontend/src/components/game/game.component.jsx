import useGameContext from "@/context/useGameContext";
import Actions from "./gameActions/actions";

const Game = () => {
  const { gameCards } = useGameContext();
  const displayCards = () => {
    if (gameCards) {
      return <div>Your Cards are {JSON.stringify(gameCards)}</div>;
    }
    return <div>You have no cards</div>;
  };

  return (
    <div>
      <h1>Game</h1>
      <Actions></Actions>
      {displayCards()}
    </div>
  );
};

export default Game;
