import ActionLegend from "../../components/actionLegend/actionLegend.component";
import PlayerList from "../../components/playerlist/playerList.component";
import Card from "../../components/card/card.component";
import CardInfo from "@/components/card/CardInfo";
import GameCard from "@/lib/cardEnum";
const TestPage = () => {
  const players = [
    { name: "Diane", cards: 1 },
    { name: "Steve", cards: 2 },
    { name: "Katie", cards: 0 },
    { name: "Joe", cards: 2 },
    { name: "Morgan", cards: 0 },
    { name: "Dwayne", cards: 2 },
  ];

  return (
    <div>
      <h1>Test Page</h1>
      <PlayerList playerList={players} />
      <ActionLegend />
      <Card card={CardInfo[GameCard.Assassin]} />
      <Card card={CardInfo[GameCard.Ambassador]} />
      <Card card={CardInfo[GameCard.Contessa]} />
      <Card card={CardInfo[GameCard.Captain]} />
      <Card card={CardInfo[GameCard.Duke]} />
    </div>
  );
};

export default TestPage;
