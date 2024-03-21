import ActionTable from "../../components/actionTable/actionTable.component";
import PlayerList from "../../components/playerlist/playerList.component";
import Card from "../../components/card/card.component";

const TestPage = () => {
    const players = [
        {"name": "Diane", "cards": 1},
        {"name": "Steve", "cards": 2},
        {"name": "Katie", "cards": 0},
        {"name": "Joe", "cards": 2},
        {"name": "Morgan", "cards": 0},
        {"name": "Dwayne", "cards": 2}
    ]
    const card1 = {
      "character": "Assassin",
      "action-name": "Assassinate",
      "action-effect": "Pay 3 coins \nChoose player to lose influence",
      "counteraction": ""
    }
    const card2 = {
      "character": "Ambassador",
      "action-name": "Exchange",
      "action-effect": "Exchange cards with court deck",
      "counteraction": "Blocks stealing"
    }

    return (
      <div>
        <h1>Test Page</h1>
        <PlayerList playerList={players} />
        <ActionTable />
        <Card card={card1} />
        <Card card={card2} />
      </div>
    );
  };
  
  export default TestPage;
  