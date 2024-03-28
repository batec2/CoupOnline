import { useState, useContext, useRef } from "react";
import SocketContext from "@/context/socketContext";
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
  const [currentLobbyMembers, setLobbyMembers] = useState(null);
  const [gameStart, setGameStart] = useState(false);
  const [currentTurnId, setTurnId] = useState(null);
  const [gameCards, setGameCards] = useState(null);
  const [initialAction, setInitialAction] = useState(null);
  const [initialUserId, setInitialUserId] = useState(null);
  const [isTarget, setIsTarget] = useState(false);
  const [coins, setCoins] = useState(0);
  const [isResponding, setIsResponding] = useState(false);
  const [responseAction, setResponseAction] = useState(null);
  const exchangeCardsRef = useRef(null);
  const responseIdRef = useRef(null);
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
    initialAction: initialAction,
    setInitialAction: setInitialAction,
    initialUserId: initialUserId,
    setInitialUserId: setInitialUserId,
    isTarget: isTarget,
    setIsTarget: setIsTarget,
    coins: coins,
    setCoins: setCoins,
    isResponding: isResponding,
    setIsResponding: setIsResponding,
    responseAction: responseAction,
    setResponseAction: setResponseAction,
    exchangeCardsRef: exchangeCardsRef,
    responseIdRef: responseIdRef,
    socket: socket,
    roomId: roomId,
  };
};
