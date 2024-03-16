import { Button } from "../ui/button";

const Cards = (card) => {
  if (card) {
    return <Button>{card}</Button>;
  } else return;
};

const CalledOutActions = ({ socket, roomId, cards }) => {
  return (
    <div>
      <h1>You Have Been Called-out Choose a Card to show</h1>
      <div>
        <Cards card={cards[0]}></Cards>
        <Cards card={cards[1]}></Cards>
      </div>
    </div>
  );
};

export default CalledOutActions;
