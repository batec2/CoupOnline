import useGameContext from "@/context/useGameContext.js";
import CardInfo from "@/components/card/CardInfo";
import Card from "@/components/card/card.component";

const PlayerCards = () => {
  const { gameCards } = useGameContext();
  return (
    <div className="flex">
      <Card card={CardInfo[gameCards[0]]}></Card>
      <Card card={CardInfo[gameCards[1]]}></Card>
    </div>
  );
};

export default PlayerCards;
