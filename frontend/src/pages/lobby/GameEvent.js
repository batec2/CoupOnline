import { useEffect } from "react";
import handleStatus from "@/lib/handleStatus";
import GameActions from "@/lib/actionEnum";

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
    setRequestAction,
    requestIdRef,
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

    /**
     *
     * @param {*} requestId - Player asking for target to choose card
     * @param {*} targetId - Player choosing card
     * @param {*} requestAction - type of choose card action
     * @returns
     */
    const onChooseCardEvent = ({ requestId, targetId, requestAction }) => {
      setTurnId(targetId);
      setRequestAction(requestAction);
      requestIdRef.current = requestId;
      if (targetId === socket.id) {
        setIsTarget(true);
        return;
      }
      setIsTarget(false);
    };

    const onUpdateState = ({ gameCards, turnId, coins }) => {
      console.log(coins);
      setGameCards(gameCards);
      setTurnId(turnId);
      setIsTarget(false);
      requestIdRef.current = null;
      setCoins(coins);
    };

    socket.connect();
    socket.emit("join-room", { roomId: roomId, userId: "user1" }, handleStatus);
    socket.on("lobby-members", onLobbyEvent);
    socket.on("start-game", onStartEvent);
    socket.on("player-choice", onActionEvent);
    socket.on("block", onActionEvent);
    socket.on("choose-card", onChooseCardEvent);
    socket.on("update-state", onUpdateState);

    // Removes all event listeners when component is removed
    return () => {
      socket.off("lobby-members", onLobbyEvent);
      socket.off("start-game", onStartEvent);
      socket.off("player-choice", onActionEvent);
      socket.off("called-out", onActionEvent);
      socket.off("block", onActionEvent);
      socket.off("choose-card", onChooseCardEvent);
      socket.off("update-state", onUpdateState);
      socket.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
