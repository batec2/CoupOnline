import { useState, useContext, createContext } from "react";

const StateContext = createContext();

export const StateProvider = ({ children }) => {
  const [currentLobbyMembers, setLobbyMembers] = useState(null);
  const [gameStart, setGameStart] = useState(false);
  const [currentTurnId, setTurnId] = useState(null);
  const [gameCards, setGameCards] = useState(null);
  const [responseAction, setResponseAction] = useState(null);

  return (
    <StateContext.Provider
      value={{
        currentLobbyMembers: currentLobbyMembers,
        setLobbyMembers: setLobbyMembers,
        gameStart: gameStart,
        setGameStart: setGameStart,
        currentTurnId: currentTurnId,
        setTurnId: setTurnId,
        gameCards: gameCards,
        setGameCards: setGameCards,
        responseAction: responseAction,
        setResponseAction: setResponseAction,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};
