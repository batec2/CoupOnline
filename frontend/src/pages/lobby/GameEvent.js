import { useEffect } from "react";
import handleStatus from "@/lib/handleStatus";

/**
 * Sets up socket listeners for gamestate variables
 * @param {*} gameState
 */
export const useGameEvents = (gameState) => {
  const {
    socket,
    roomId,
    setLobbyMembers,
    setGameCards,
    setGameStart,
    setTurnId,
    setResponseAction,
    setIsTarget,
    setCoins,
  } = gameState;

  useEffect(() => {
    const onLobbyEvent = ({ lobby }) => {
      setLobbyMembers(lobby);
    };

    const onStartEvent = () => {
      setGameStart(true);
    };

    const onActionEvent = ({ responseAction }) => {
      setResponseAction(responseAction);
    };

    const onCoupEvent = ({ userId, targetId }) => {
      setTurnId(targetId);
      if (targetId === socket.id) {
        console.log(`you're being couped by ${userId}`);
        setIsTarget(true);
        return;
      }
      console.log(userId + "is Couping" + targetId);
    };

    const onUpdateState = ({ gameCards, turnId, coins }) => {
      console.log(coins);
      setGameCards(gameCards);
      setTurnId(turnId);
      setIsTarget(false);
      setCoins(coins);
    };

    socket.connect();
    socket.emit("join-room", { roomId: roomId, userId: "user1" }, handleStatus);

    socket.on("lobby-members", onLobbyEvent);
    socket.on("start-game", onStartEvent);
    socket.on("player-choice", onActionEvent);
    socket.on("called-out", onActionEvent);
    socket.on("block", onActionEvent);
    socket.on("coup", onCoupEvent);
    socket.on("update-state", onUpdateState);

    // Removes all event listeners when component is removed
    return () => {
      socket.off("lobby-members", onLobbyEvent);
      socket.off("start-game", onStartEvent);
      socket.off("player-choice", onActionEvent);
      socket.off("called-out", onActionEvent);
      socket.off("block", onActionEvent);
      socket.off("coup", onCoupEvent);
      socket.off("update-state", onUpdateState);
      socket.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
