import "./lobby.styles.css";
import LobbyComponent from "@/components/lobby/lobby.component";
import Game from "@/components/game/game.component";
import { GameStateContext } from "@/context/GameStateContext";
import { useGameEvents } from "./GameEvent";
import { useGameState } from "./GameState";

const LobbyPage = () => {
  const gameState = useGameState();
  useGameEvents(gameState);

  const handleUi = () => {
    if (gameState.gameStart) {
      return <Game></Game>;
    }
    return <LobbyComponent></LobbyComponent>;
  };

  return (
    <GameStateContext.Provider value={gameState}>
      {handleUi()}
    </GameStateContext.Provider>
  );
};

export default LobbyPage;
