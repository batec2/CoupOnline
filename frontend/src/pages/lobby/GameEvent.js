import { useEffect, useState } from "react";
import handleStatus from "@/lib/handleStatus";
import GameActions from "@/lib/actionEnum";
import Cookie from "universal-cookie";
/**
 * Sets up socket listeners for gamestate variables
 * @param {*} gameState
 */
const cookie = new Cookie();
export const useGameEvents = (gameState) => {
  const {
    socket,
    roomId,
    setLobbyMembers,
    setGameCards,
    setGameStart,
    setTurnId,
    setInitialUserId,
    setInitialAction,
    setIsTarget,
    setCoins,
    setResponseAction,
    responseIdRef,
  } = gameState;
  const localCookie = cookie.get("PersonalCookie");

  useEffect(() => {
    const onLobbyEvent = ({ lobby }) => {
      setLobbyMembers(lobby);
    };

    const onStartEvent = () => {
      setGameStart(true);
    };

    const onChooseResponseEvent = ({ initialUserId, initialAction }) => {
      setInitialAction(initialAction);
      setInitialUserId(initialUserId);
    };

    /**
     *
     * @param {*} chooserId - Player asking for target to choose card
     * @param {*} initialUserId - initial user
     * @param {*} initialAction - initial action
     * @param {*} responseId - response userId
     * @param {*} responseAction - response action
     * @returns
     */
    const onChooseCardEvent = ({
      chooserId,
      initialUserId,
      initialAction,
      responseId,
      responseAction,
    }) => {
      setTurnId(chooserId);
      setInitialUserId(initialUserId);
      setResponseAction(responseAction ? responseAction : initialAction);
      responseIdRef.current = responseId;
      if (chooserId === socket.id) {
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
      responseIdRef.current = null;
      setCoins(coins);
    };

    socket.connect();
    socket.emit(
      "join-room",
      { roomId: roomId, userId: localCookie["username"] },
      handleStatus
    );
    socket.on("lobby-members", onLobbyEvent);
    socket.on("start-game", onStartEvent);
    socket.on("choose-response", onChooseResponseEvent);
    socket.on("choose-card", onChooseCardEvent);
    socket.on("update-state", onUpdateState);

    // Removes all event listeners when component is removed
    return () => {
      socket.off("lobby-members", onLobbyEvent);
      socket.off("start-game", onStartEvent);
      socket.off("choose-response", onChooseResponseEvent);
      socket.off("choose-card", onChooseCardEvent);
      socket.off("update-state", onUpdateState);
      socket.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
