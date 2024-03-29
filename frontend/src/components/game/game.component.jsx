import useGameContext from "@/context/useGameContext";
import Actions from "./gameActions/actions.component";
import PlayerCards from "./gameCards/playerCards.component";
// import PlayerInfo from "./playerInfo/playerInfo.component";
import CurrentTurnInfo from "./currentTurnInfo/currentTurnInfo.component";
import CardList from "../cardList/cardList.component";
import References from "./references/references.component";
import PlayerInfo from "./playerInfo/playerInfo.component";
import TurnHistory from "./turnHistory/turnHistory.component";

//For testing only - remove later
const discard = {
  0: { card: "Duke", count: 0 },
  1: { card: "Assassin", count: 0 },
  2: { card: "Ambassador", count: 0 },
  3: { card: "Captain", count: 0 },
  4: { card: "Contessa", count: 0 },
};

const Game = () => {
  const { roomId, currentLobbyMembers } = useGameContext();
  return (
    <div>
      <p className="flex-row text-3xl font-bold">Room: {roomId}</p>
      <div className="grid grid-cols-3 border divide-y divide-x">
        <CardList items={currentLobbyMembers} context={"players"} />
        <CurrentTurnInfo />
        <CardList items={discard} context={"discard"} />
        <TurnHistory />
        <PlayerInfo />
        <References />
      </div>
    </div>
  );
};

export default Game;
