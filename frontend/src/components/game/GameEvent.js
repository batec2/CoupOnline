import { useEffect } from "react";
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
    setWinner,
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
    setIsResponding,
    exchangeCardsRef,
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
      setIsResponding(true);
    };

    /**
     *
     * @param {*} chooserId - Player asking for target to choose card
     * @param {*} initialUserId - initial user
     * @param {*} initialAction - initial action
     * @param {*} responseId - responser userId
     * @param {*} responseAction - responser action
     * @returns
     */
    const onChooseCardEvent = ({
      chooserId,
      initialUserId,
      initialAction,
      responseId,
      responseAction,
    }) => {
      console.log(
        `${chooserId} is choosing a card, initial action: ${GameActions[initialAction]}, responseAction: ${GameActions[responseAction]}`
      );
      setIsResponding(false);
      setTurnId(chooserId);
      setInitialUserId(initialUserId);
      setInitialAction(initialAction);
      setResponseAction(responseAction ? responseAction : initialAction);
      responseIdRef.current = responseId;

      if (chooserId === socket.id) {
        setIsTarget(true);
        return;
      }
      setIsTarget(false);
    };

    const onExchangeCardEvent = ({ chooserId, exchangeCards, playerCards }) => {
      console.log(`${chooserId} is choosing 2 cards`);
      exchangeCardsRef.current = exchangeCards;
      if (chooserId === socket.id) {
        setIsTarget(true);
        return;
      }
      setIsTarget(false);
    };

    const onUpdateState = ({ gameCards, turnId, coins }) => {
      setGameCards(gameCards);
      setTurnId(turnId);
      setIsTarget(false);
      setInitialAction(null);
      setInitialUserId(null);
      responseIdRef.current = null;
      setResponseAction(null);
      setCoins(coins);
    };

    const onBlocked = ({
      initialUserId,
      initialAction,
      responseId,
      responseAction,
    }) => {
      setInitialUserId(initialUserId);
      setInitialAction(initialAction);
      responseIdRef.current = responseId;
      setResponseAction(responseAction);
      if (initialUserId === socket.id) {
        setIsResponding(true);
        return;
      }
      setIsResponding(false);
    };

    const onEndGame = ({ winner }) => {
      setWinner(winner);
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
    socket.on("exchange-cards", onExchangeCardEvent);
    socket.on("update-state", onUpdateState);
    socket.on("blocked", onBlocked);
    socket.on("end-game", onEndGame);

    // Removes all event listeners when component is removed
    return () => {
      socket.off("lobby-members", onLobbyEvent);
      socket.off("start-game", onStartEvent);
      socket.off("choose-response", onChooseResponseEvent);
      socket.off("choose-card", onChooseCardEvent);
      socket.off("exchange-cards", onExchangeCardEvent);
      socket.off("update-state", onUpdateState);
      socket.off("blocked", onBlocked);
      socket.off("end-game", onEndGame);
      socket.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
