import { useState, useContext, useRef } from "react";
import { useParams } from "react-router-dom";
/**
 * @typedef {Object} GameState
 * @property {Object} currentLobbyMembers
 * @property {function} setLobbyMembers
 * @property {boolean} gameStart
 * @property {function} setGameStart
 * @property {Object} currentTurnId
 * @property {function} setTurnId
 * @property {Object} gameCards
 * @property {function} setGameCards
 * @property {Object} responseAction
 * @property {function} setResponseAction
 * @property {boolean} isTarget
 * @property {function} setIsTarget
 * @property {number} coins
 * @property {function} setCoins
 * @property {Object} socket
 * @property {string} roomId
 */

/**
 *
 * @returns {GameState}
 */
export const useGameState = () => {
  const [winner, setWinner] = useState(null);
  const [currentLobbyMembers, setLobbyMembers] = useState(null);
  const [gameStart, setGameStart] = useState(false);
  const [currentTurnId, setTurnId] = useState(null);
  const [gameCards, setGameCards] = useState(null);
  const [initialAction, setInitialAction] = useState(null);
  const [initialUserId, setInitialUserId] = useState(null);
  const [isChoosing, setIsChoosing] = useState(false);
  const [isTarget, setIsTarget] = useState(false);
  const [coins, setCoins] = useState(0);
  const [discardDeck, setDiscardDeck] = useState([0, 0, 0, 0, 0]);
  const [isResponding, setIsResponding] = useState(false);
  const [responseAction, setResponseAction] = useState(null);
  const [exchangeCards, setExchangeCards] = useState(null);
  const [chooseType, setChooseType] = useState(null);
  const [playerCardCount, setPlayerCardCount] = useState(null);
  const responseIdRef = useRef(null);
  const socket = useRef(null);
  const { roomId } = useParams();

  return {
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
    responseAction: responseAction,
    setResponseAction: setResponseAction,
    exchangeCards: exchangeCards,
    setExchangeCards: setExchangeCards,
    responseIdRef: responseIdRef,
    isTarget: isTarget,
    setIsTarget: setIsTarget,
    chooseType: chooseType,
    setChooseType: setChooseType,
    playerCardCount: playerCardCount,
    setPlayerCardCount: setPlayerCardCount,
    socket: socket,
    roomId: roomId,
  };
};
