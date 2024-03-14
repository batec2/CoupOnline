import ActionLegend from "../../components/actionLegend/actionLegend.component";
import PlayerList from "../../components/playerlist/playerList.component";
import Card from "../../components/card/card.component";

const TestPage = () => {
  const players = [
    { name: "Diane", cards: 1 },
    { name: "Steve", cards: 2 },
    { name: "Katie", cards: 0 },
    { name: "Joe", cards: 2 },
    { name: "Morgan", cards: 0 },
    { name: "Dwayne", cards: 2 },
  ];
  const card = {
    character: "Assassin",
    "action-name": "Assassinate",
    "action-effect": "Pay 3 coins \nChoose player to lose influence",
    counteraction: "",
  };

  return (
    <div>
      <h1>Test Page</h1>
      <PlayerList playerList={players} />
      <ActionLegend />
      <Card card={card} />
    </div>
  );
};

export default TestPage;
