import { useEffect } from "react";
import handleStatus from "@/lib/handleStatus";
import GameActions from "@/lib/actionEnum";
import Cookie from "universal-cookie";
import { useNavigate } from "react-router-dom";
import usePlayerState from "./PlayerState";
import Cookies from "universal-cookie";
import { io } from "socket.io-client";
import { terminal } from "virtual:terminal";
/**
 * Sets up socket listeners for gamestate variables
 * @param {*} gameState
 */
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
    setDiscardDeck,
    setResponseAction,
    setIsResponding,
    setExchangeCards,
    responseIdRef,
  } = gameState;

  const cookie = new Cookie();
  const localCookie = cookie.get("PersonalCookie");
  const navigate = useNavigate();
  const { setInLobby } = usePlayerState();
  const cookies = new Cookies();

  useEffect(() => {
    if (!socket.current) {
      const cookie = cookies.get("PersonalCookie");
      socket.current = io("http://localhost:8080", {
        extraHeaders: {
          id: cookie._id,
          username: cookie.userName,
          screenName: cookie.screenName,
        },
      });
      console.log(socket.current);
      // socket.current.join("asd");
    }

    const onLobbyEvent = ({ lobby }) => {
      setLobbyMembers(lobby);
    };

    const handleStatusOnRoomJoin = (status) => {
      if (status.status === 400) {
        navigate("/room");
      }
    };

    const onStartEvent = () => {
      setInLobby(false);
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

      if (chooserId === socket.current.id) {
        setIsTarget(true);
        return;
      }
      setIsTarget(false);
    };

    const onExchangeCardEvent = ({ chooserId, exchangeCards, playerCards }) => {
      console.log(`${chooserId} is choosing 2 cards`);
      if (chooserId === socket.current.id) {
        setExchangeCards(exchangeCards);
      }
    };

    const onUpdateState = ({ gameCards, turnId, coins, discardDeck }) => {
      setGameCards(gameCards);
      setTurnId(turnId);
      setExchangeCards.current = null;
      setIsTarget(false);
      setInitialAction(null);
      setInitialUserId(null);
      responseIdRef.current = null;
      setResponseAction(null);
      setCoins(coins);
      setDiscardDeck(discardDeck);
      console.log(discardDeck);
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
      if (responseId !== socket.current.id) {
        setIsResponding(true);
        return;
      }
      setIsResponding(false);
    };

    const onEndGame = ({ winner }) => {
      setWinner(winner);
    };

    socket.current.connect();
    socket.current.emit(
      "join-room",
      { roomId: roomId, userId: localCookie["username"] },
      handleStatusOnRoomJoin
    );
    socket.current.on("lobby-members", onLobbyEvent);
    socket.current.on("start-game", onStartEvent);
    socket.current.on("choose-response", onChooseResponseEvent);
    socket.current.on("choose-card", onChooseCardEvent);
    socket.current.on("exchange-cards", onExchangeCardEvent);
    socket.current.on("update-state", onUpdateState);
    socket.current.on("blocked", onBlocked);
    socket.current.on("end-game", onEndGame);

    // Removes all event listeners when component is removed
    return () => {
      socket.current.off("lobby-members", onLobbyEvent);
      socket.current.off("start-game", onStartEvent);
      socket.current.off("choose-response", onChooseResponseEvent);
      socket.current.off("choose-card", onChooseCardEvent);
      socket.current.off("exchange-cards", onExchangeCardEvent);
      socket.current.off("update-state", onUpdateState);
      socket.current.off("blocked", onBlocked);
      socket.current.off("end-game", onEndGame);
      socket.current.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
