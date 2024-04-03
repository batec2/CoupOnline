import LobbyComponent from "@/components/lobby/lobby.component";
import Game from "@/components/game/game.component";
import { GameStateContext } from "@/context/GameStateContext";
import { useGameEvents } from "@/components/game/GameEvent";
import { useGameState } from "../../components/game/GameState";
import GameEnd from "@/components/gameEnd/gameEnd.component";
import {useEffect} from "react";
import checkIfActiveSession from "@/actions/checkIfActiveSession.js";
import logoutCall from "@/actions/logout.js";

const LobbyPage = () => {
  const gameState = useGameState();
  useGameEvents(gameState);

  const displayUI = () => {
    if (gameState.gameStart) {
      return <Game></Game>;
    }
    return <LobbyComponent></LobbyComponent>;
  };

  if (gameState.winner) {
    return (
      <>
        <GameStateContext.Provider value={gameState}>
          <GameEnd></GameEnd>
        </GameStateContext.Provider>
      </>
    );
  }

  return (
    <GameStateContext.Provider value={gameState}>
      {displayUI()}
    </GameStateContext.Provider>
  );
};

export default LobbyPage;
