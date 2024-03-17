import { GameStateContext } from "./GameStateContext";
import { useContext } from "react";
const useGameContext = () => {
  return useContext(GameStateContext);
};

export default useGameContext;
