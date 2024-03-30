import useGameContext from "@/context/useGameContext";
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
    <div className="h-screen">
      <p className="text-3xl font-bold text-center">Room: {roomId}</p>
      <div className="sm:flex sm:flex-col md:grid md:grid-cols-4">
        <div className="sm:order-1 md:order-2 md:col-span-2 border m-1 rounded-sm">
          <CurrentTurnInfo />
        </div>
        <div className="sm:order-2 md:order-5 md:col-span-2 border m-1 rounded-sm">
          <PlayerInfo />
        </div>
        <div className="sm:order-3 md:order-1 border m-1 rounded-sm">
          <CardList items={currentLobbyMembers} context={"players"} />
        </div>
        <div className="sm:order-4 md:order-4 border m-1 rounded-sm">
          <TurnHistory className="sm:order-2 md:order-1"/>
        </div>
        <div className="sm:order-5 md:order-3 border m-1 rounded-sm">
          <CardList items={discard} context={"discard"} />
        </div>
        <div className="sm:order-6 md:order-6 border m-1 rounded-sm">
         <References className="sm:order-9 md:order-6" />
        </div>
      </div>
    </div>
  );
};

export default Game;
