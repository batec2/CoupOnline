import ActionTable from "../../components/actionTable/actionTable.component";
import CardList from "../../components/cardList/playerList.component";
import Card from "../../components/card/card.component";
import CardInfo from "@/components/card/CardInfo";
import GameCard from "@/lib/cardEnum";
import { Button } from "../../components/ui/button";
const TestPage = () => {
  const players = [
    { item: "Diane", count: 1 },
    { item: "Steve", count: 2 },
    { item: "Katie", count: 0 },
    { item: "Joe", count: 2 },
    { item: "Morgan", count: 0 },
    { item: "Dwayne", count: 2 },
  ];
  const card1 = {
    character: "Assassin",
    "action-name": "Assassinate",
    "action-effect": "Pay 3 coins \nChoose player to lose influence",
    counteraction: "",
  };
  const card2 = {
    character: "Ambassador",
    "action-name": "Exchange",
    "action-effect": "Exchange cards with court deck",
    counteraction: "Blocks stealing",
  };

  return (
    <div>
      <h1>Test Page</h1>
      <Button className="flex bg-actions-unavailable">Button</Button>
      <ActionTable />
    </div>
  );
};

export default TestPage;
