import { createContext } from "react";

export const GameStateContext = createContext();

export const GameStateProvider = ({ value, children }) => {
  return (
    <GameStateContext.Provider value={value}>
      {children}
    </GameStateContext.Provider>
  );
};
