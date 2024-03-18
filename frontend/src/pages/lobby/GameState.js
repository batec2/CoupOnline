import { useState, useContext } from "react";
import SocketContext from "@/context/socketContext";
import { useParams } from "react-router-dom";

export const useGameState = () => {
  const [currentLobbyMembers, setLobbyMembers] = useState(null);
  const [gameStart, setGameStart] = useState(false);
  const [currentTurnId, setTurnId] = useState(null);
  const [gameCards, setGameCards] = useState(null);
  const [responseAction, setResponseAction] = useState(null);
  const socket = useContext(SocketContext);
  const { roomId } = useParams();

  return {
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
    socket: socket,
    roomId: roomId,
  };
};
