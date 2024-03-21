import { GameStateContext } from "./GameStateContext";
import { useContext } from "react";

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
 * @property {Object} socket
 * @property {string} roomId
 */

/**
 * Returns GameState Context
 * @returns {GameState} the shared gamestate
 */
const useGameContext = () => {
  return useContext(GameStateContext);
};

export default useGameContext;
