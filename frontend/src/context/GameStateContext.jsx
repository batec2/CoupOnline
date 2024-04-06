import { createContext } from "react";

export const GameStateContext = createContext();

/**
 * Gives Children access to the GameState object
 * @returns
 */
export const GameStateProvider = ({ value, children }) => {
  return (
    <GameStateContext.Provider value={value}>
      {children}
    </GameStateContext.Provider>
  );
};
