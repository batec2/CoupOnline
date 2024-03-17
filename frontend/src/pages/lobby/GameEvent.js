import { useEffect } from "react";
import handleStatus from "@/lib/handleStatus";

export const useGameEvents = (gameState) => {
  const {
    socket,
    roomId,
    setLobbyMembers,
    setGameCards,
    setGameStart,
    setTurnId,
    setResponseAction,
  } = gameState;

  useEffect(() => {
    const onLobbyEvent = ({ lobby }) => {
      setLobbyMembers(lobby);
    };
    const onCardsEvent = ({ cards }) => {
      setGameCards(cards);
    };
    const onStartEvent = ({ turnId }) => {
      setGameStart(true);
      setTurnId(turnId);
    };
    const onActionEvent = ({ responseAction }) => {
      setResponseAction(responseAction);
    };
    socket.connect();
    socket.emit("join-room", { roomId: roomId, userId: "user1" }, handleStatus);

    socket.on("lobby-members", onLobbyEvent);
    socket.on("game-cards", onCardsEvent);
    socket.on("start-game", onStartEvent);
    socket.on("player-choice", onActionEvent);
    socket.on("called-out", onActionEvent);
    socket.on("block", onActionEvent);

    // Removes all event listeners when component is removed
    return () => {
      socket.on("lobby-members", onLobbyEvent);
      socket.on("game-cards", onCardsEvent);
      socket.on("start-game", onStartEvent);
      socket.on("player-choice", onActionEvent);
      socket.on("called-out", onActionEvent);
      socket.on("block", onActionEvent);
      socket.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
