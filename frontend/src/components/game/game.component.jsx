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
      <div className="max-w-sm:flex max-w-sm:flex-col sm:grid sm:grid-cols-4">
        <div className="max-w-sm:order-1 sm:order-2 border sm:col-span-2  game-panels">
          <CurrentTurnInfo />
        </div>
        <div className="max-w-sm:order-2 sm:order-5 sm:col-span-2 game-panels">
          <PlayerInfo />
        </div>
        <div className="max-w-sm:order-3 sm:order-1 game-panels">
          <PlayerCardList />
        </div>
        <div className="max-w-sm:order-4 sm:order-4  game-panels h-96 overflow-y-auto">
          <TurnHistory />
        </div>
        <div className="max-w-sm:order-5 sm:order-3  game-panels">
          <DiscardList />
        </div>
        <div className="max-w-sm:order-6 sm:order-6  game-panels">
          <References />
        </div>
      </div>
    </div>
    </div>
  );
};

export default Game;
