import { GameStateContext } from "./GameStateContext";
import { useContext } from "react";
// Provides access to GameContext object
const useGameContext = () => {
  return useContext(GameStateContext);
};

export default useGameContext;
