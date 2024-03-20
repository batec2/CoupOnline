import useGameContext from "@/context/useGameContext.js";
import CardInfo from "@/components/card/CardInfo";
import Card from "@/components/card/card.component";
import { handleLoseCard } from "@/actions/socketActions";

const PlayerCards = () => {
  const { gameCards, isTarget, socket, roomId } = useGameContext();
  const showPrompt = () => {
    if (isTarget) {
      return <p className="font-bold">Please Select a Card to Lose</p>;
    }
  };

  return (
    <>
      <div className="flex">
        <Card
          card={CardInfo[gameCards[0]]}
          onClick={() => handleLoseCard(socket, roomId, 0, isTarget)}
        ></Card>
        <Card
          card={CardInfo[gameCards[1]]}
          onClick={() => handleLoseCard(socket, roomId, 1, isTarget)}
        ></Card>
      </div>
      {showPrompt()}
    </>
  );
};

export default PlayerCards;
