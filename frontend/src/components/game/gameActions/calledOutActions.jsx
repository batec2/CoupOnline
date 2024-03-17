import useGameContext from "@/context/useGameContext";
import { Button } from "../../ui/button";

const Cards = (card) => {
  if (card) {
    return <Button>{card}</Button>;
  } else return;
};

const CalledOutActions = () => {
  const { gameCards } = useGameContext();
  return (
    <div>
      <h1>You Have Been Called-out Choose a Card to show</h1>
      <div>
        <Cards card={gameCards[0]}></Cards>
        <Cards card={gameCards[1]}></Cards>
      </div>
    </div>
  );
};

export default CalledOutActions;
