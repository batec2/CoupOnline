import useGameContext from "@/context/useGameContext";
import CurrentTurnInfo from "./currentTurnInfo/currentTurnInfo.component";
import PlayerCardList from "../cardList/playerList.component";
import DiscardList from "../cardList/discardList.component";
import References from "./references/references.component";
import PlayerInfo from "./playerInfo/playerInfo.component";
import TurnHistory from "./turnHistory/turnHistory.component";
import "./game.styles.css";


const Game = () => {
  const { roomId, currentLobbyMembers } = useGameContext();
  return (
    <div className="flex justify-center">    
    <div className="h-screen max-w-screen-2xl">
      <p className="text-3xl font-bold text-center">Room: {roomId}</p>
      <div className="sm:flex sm:flex-col md:grid md:grid-cols-4">
        <div className="sm:order-1 md:order-2 border md:col-span-2  game-panels">
          <CurrentTurnInfo />
        </div>
        <div className="sm:order-2 md:order-5 md:col-span-2 game-panels">
          <PlayerInfo />
        </div>
        <div className="sm:order-3 md:order-1 game-panels">
          <PlayerCardList />
        </div>
        <div className="sm:order-4 md:order-4  game-panels">
          <TurnHistory className="sm:order-2 md:order-1" />
        </div>
        <div className="sm:order-5 md:order-3  game-panels">
          <DiscardList />
        </div>
        <div className="sm:order-6 md:order-6  game-panels">
          <References className="sm:order-9 md:order-6" />
        </div>
      </div>
    </div>
    </div>
  );
};

export default Game;
