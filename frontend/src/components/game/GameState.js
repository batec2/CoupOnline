import { useState, useContext, useRef } from "react";
import { useParams } from "react-router-dom";
/**
 * @typedef {Object} GameState
 * @property {*} eventLog,
 * @property {*} setEventLog,
 * @property {*} winner,
 * @property {*} setWinner,
 * @property {*} currentLobbyMembers,
 * @property {*} setLobbyMembers,
 * @property {*} gameStart,
 * @property {*} setGameStart,
 * @property {*} currentTurnId,
 * @property {*} setTurnId,
 * @property {*} gameCards,
 * @property {*} setGameCards,
 * @property {*} initialAction,
 * @property {*} setInitialAction,
 * @property {*} initialUserId,
 * @property {*} setInitialUserId,
 * @property {*} isChoosing,
 * @property {*} setIsChoosing,
 * @property {*} coins,
 * @property {*} setCoins,
 * @property {*} discardDeck,
 * @property {*} setDiscardDeck,
 * @property {*} isResponding,
 * @property {*} setIsResponding,
 * @property {*} responseInitialAction,
 * @property {*} setResponseInitialAction,
 * @property {*} responseInitialId,
 * @property {*} setResponseInitialId,
 * @property {*} responseSecondaryAction,
 * @property {*} setResponseSecondaryAction,
 * @property {*} responseSecondaryId
 * @property {*} setResponseSecondaryId
 * @property {*} exchangeCards
 * @property {*} setExchangeCards
 * @property {*} responseIdRef
 * @property {*} isTarget
 * @property {*} setIsTarget
 * @property {*} targetId
 * @property {*} setTargetId
 * @property {*} chooseType
 * @property {*} setChooseType
 * @property {*} playerCardCount
 * @property {*} setPlayerCardCount
 * @property {*} cookieRef
 * @property {*} socket
 * @property {*} roomId
 */

/**
 * @returns {GameState}
 */
export const useGameState = () => {
  const [eventLog, setEventLog] = useState([]);
  const [winner, setWinner] = useState(null);
  const [currentLobbyMembers, setLobbyMembers] = useState(null);
  const [gameStart, setGameStart] = useState(false);
  const [currentTurnId, setTurnId] = useState(null);
  const [gameCards, setGameCards] = useState(null);
  const [initialAction, setInitialAction] = useState(null);
  const [initialUserId, setInitialUserId] = useState(null);
  const [isChoosing, setIsChoosing] = useState(false);
  const [targetId, setTargetId] = useState(null);
  const [isTarget, setIsTarget] = useState(false);
  const [coins, setCoins] = useState(0);
  const [discardDeck, setDiscardDeck] = useState([0, 0, 0, 0, 0]);
  const [isResponding, setIsResponding] = useState(false);
  const [responseInitialAction, setResponseInitialAction] = useState(null);
  const [responseInitialId, setResponseInitialId] = useState(null);
  const [responseSecondaryAction, setResponseSecondaryAction] = useState(null);
  const [responseSecondaryId, setResponseSecondaryId] = useState(null);
  const [exchangeCards, setExchangeCards] = useState(null);
  const [chooseType, setChooseType] = useState(null);
  const [playerCardCount, setPlayerCardCount] = useState(null);
  const responseIdRef = useRef(null);
  const socket = useRef(null);
  const cookieRef = useRef(null);
  const { roomId } = useParams();

  return {
    eventLog: eventLog,
    setEventLog: setEventLog,
    winner: winner,
    setWinner: setWinner,
    currentLobbyMembers: currentLobbyMembers,
    setLobbyMembers: setLobbyMembers,
    gameStart: gameStart,
    setGameStart: setGameStart,
    currentTurnId: currentTurnId,
    setTurnId: setTurnId,
    gameCards: gameCards,
    setGameCards: setGameCards,
    initialAction: initialAction,
    setInitialAction: setInitialAction,
    initialUserId: initialUserId,
    setInitialUserId: setInitialUserId,
    isChoosing: isChoosing,
    setIsChoosing: setIsChoosing,
    coins: coins,
    setCoins: setCoins,
    discardDeck: discardDeck,
    setDiscardDeck: setDiscardDeck,
    isResponding: isResponding,
    setIsResponding: setIsResponding,
    responseInitialAction: responseInitialAction,
    setResponseInitialAction: setResponseInitialAction,
    responseInitialId: responseInitialId,
    setResponseInitialId: setResponseInitialId,
    responseSecondaryAction: responseSecondaryAction,
    setResponseSecondaryAction: setResponseSecondaryAction,
    responseSecondaryId: responseSecondaryId,
    setResponseSecondaryId: setResponseSecondaryId,
    exchangeCards: exchangeCards,
    setExchangeCards: setExchangeCards,
    responseIdRef: responseIdRef,
    isTarget: isTarget,
    setIsTarget: setIsTarget,
    targetId: targetId,
    setTargetId: setTargetId,
    chooseType: chooseType,
    setChooseType: setChooseType,
    playerCardCount: playerCardCount,
    setPlayerCardCount: setPlayerCardCount,
    cookieRef: cookieRef,
    socket: socket,
    roomId: roomId,
  };
};
