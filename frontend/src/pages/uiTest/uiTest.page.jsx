import ActionLegend from "../../components/actionLegend/actionLegend.component";
import PlayerList from "../../components/playerList/playerList.component";

const TestPage = () => {
    const players = [
        {"name": "Diane", "cards": 1},
        {"name": "Steve", "cards": 2},
        {"name": "Katie", "cards": 0},
        {"name": "Joe", "cards": 2},
        {"name": "Morgan", "cards": 0},
        {"name": "Dwayne", "cards": 2}
    ]
    return (
      <div>
        <h1>Test Page</h1>
        <PlayerList playerList={players} />
        <ActionLegend />
      </div>
    );
  };
  
  export default TestPage;
  