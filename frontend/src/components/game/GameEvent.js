import { useEffect } from "react";
import GameActions from "@/lib/actionEnum";
import Cookie from "universal-cookie";
import { useNavigate } from "react-router-dom";
import usePlayerState from "./PlayerState";
import Cookies from "universal-cookie";
import { io } from "socket.io-client";
import ChooseCard from "@/lib/chooseCardEnum";

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
    setIsChoosing,
    setCoins,
    setDiscardDeck,
    setResponseAction,
    setIsResponding,
    setExchangeCards,
    responseIdRef,
    setIsTarget,
    setChooseType,
    setPlayerCardCount,
  } = gameState;

  const cookie = new Cookie();
  const localCookie = cookie.get("PersonalCookie");
  const navigate = useNavigate();
  const { setInLobby } = usePlayerState();
  const cookies = new Cookies();

  useEffect(() => {
    // Creates socket client if there is not socket object
    if (!socket.current) {
      const cookie = cookies.get("PersonalCookie");
      console.log(cookie.screenName);
      socket.current = io("http://localhost:8080", {
        extraHeaders: {
          id: cookie.id,
          username: cookie.username,
          screenname: cookie.screenName,
        },
      });
      console.log(socket.current);
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

    const onChooseResponseEvent = ({
      initialUserId,
      initialAction,
      targetId,
    }) => {
      console.log(
        `Choose a response to ${initialUserId}'s action of ${GameActions[initialAction]}, ${targetId} is the target`
      );
      setInitialAction(initialAction);
      setInitialUserId(initialUserId);
      setIsResponding(true);
      if (socket.current.id === targetId) {
        setIsTarget(true);
      }
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
      chooseType,
      initialUserId,
      initialAction,
      responseId,
      responseAction,
    }) => {
      console.log(
        `${chooserId} is choosing a card, initial action: ${GameActions[initialAction]}, responseAction: ${GameActions[responseAction]}, choose type ${ChooseCard[chooseType]}`
      );
      setIsResponding(false);
      setTurnId(chooserId);
      setChooseType(chooseType);
      setInitialUserId(initialUserId);
      setInitialAction(initialAction);
      setResponseAction(responseAction);
      responseIdRef.current = responseId;

      if (chooserId === socket.current.id) {
        setIsChoosing(true);
        return;
      }
      setIsChoosing(false);
    };

    const onExchangeCardEvent = ({ chooserId, exchangeCards }) => {
      console.log(`${chooserId} is choosing 2 cards`);
      if (chooserId === socket.current.id) {
        setChooseType(ChooseCard.Exchange);
        setExchangeCards(exchangeCards);
      }
    };

    const onUpdateState = ({
      gameCards,
      turnId,
      coins,
      discardDeck,
      playerCardCount,
    }) => {
      console.log("Updating State");
      setGameCards(gameCards);
      setTurnId(turnId);
      setExchangeCards.current = null;
      setIsChoosing(false);
      setInitialAction(null);
      setInitialUserId(turnId);
      responseIdRef.current = null;
      setResponseAction(null);
      setCoins(coins);
      setDiscardDeck(discardDeck);
      setIsTarget(false);
      setChooseType(null);
      setPlayerCardCount(playerCardCount);
    };

    const onPartialUpdate = ({
      gameCards,
      turnId,
      coins,
      discardDeck,
      playerCardCount,
    }) => {
      console.log("Partially Updating State");
      setGameCards(gameCards);
      setTurnId(turnId);
      setCoins(coins);
      setDiscardDeck(discardDeck);
      setPlayerCardCount(playerCardCount);
    };

    const onBlocked = ({
      initialUserId,
      initialAction,
      responseId,
      responseAction,
    }) => {
      console.log(
        `${initialUserId}'s action of ${GameActions[initialAction]} is being blocked by ${responseId} with action of ${GameActions[responseAction]}`
      );
      setInitialUserId(initialUserId);
      setInitialAction(initialAction);
      responseIdRef.current = responseId;
      setResponseAction(responseAction);

      // Everyone other than the blocker can respond to the block
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
    socket.current.on("partial-update-state", onPartialUpdate);
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
      socket.current.off("partial-update-state", onPartialUpdate);
      socket.current.off("blocked", onBlocked);
      socket.current.off("end-game", onEndGame);
      socket.current.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
