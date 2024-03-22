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
  const [responseAction, setResponseAction] = useState(null);
  const [requestAction, setRequestAction] = useState(null);
  const requestIdRef = useRef(null);
  const [isTarget, setIsTarget] = useState(false);
  const [coins, setCoins] = useState(0);
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
    responseAction: responseAction,
    setResponseAction: setResponseAction,
    requestAction: requestAction,
    setRequestAction: setRequestAction,
    requestIdRef: requestIdRef,
    isTarget: isTarget,
    setIsTarget: setIsTarget,
    coins: coins,
    setCoins: setCoins,
    socket: socket,
    roomId: roomId,
  };
};
