import ChooseCard from "@/lib/chooseCardEnum";
import handleStatus from "@/lib/handleStatus";

/**
 * Sends a action to the server
 * @param {Object} socket - Global Socket Object
 * @param {string} roomId - Current room id
 * @param {string} action - Action number
 */
export const handleNormalAction = (socket, roomId, action) => {
  socket.emit("normal-action", {
    roomId: roomId,
    userId: socket.id,
    action: action,
  });
};

/**
 * Sends a action with the id of the player being targeted by the action
 * @param {Object} socket - Global Socket Object
 * @param {string} roomId - Current room id
 * @param {string} action - Action number
 * @param {string} targetId - Id of the target player
 */
export const handleTargetAction = (socket, roomId, action, targetId) => {
  socket.emit("target-action", {
    roomId: roomId,
    userId: socket.id,
    action: action,
    targetId: targetId,
  });
};

/**
 * Sends an response action with the Id of the player being blocked
 * @param {Object} socket - Global Socket Object
 * @param {string} roomId - Current room id
 * @param {string} requestId - Id of the player being blocked/responded
 * @param {string} action - Block/response action
 */
export const handleResponseAction = (
  socket,
  roomId,
  requestId,
  requestAction,
  action
) => {
  socket.emit("response-action", {
    roomId: roomId,
    requestId: requestId,
    requestAction: requestAction,
    action: action,
  });
};

/**
 * Sends a start game event to the server to indicate the start button pressed
 * @param {Object} socket
 * @param {string} roomId
 */
export const handleStartGame = (socket, roomId) => {
  socket.emit(
    "start-game",
    { roomId: roomId, userId: socket.id },
    handleStatus
  );
};

export const handleChooseCard = (socket, roomId, card, isTarget, action) => {
  if (!isTarget) {
    return;
  }
  socket.emit("choose-card", {
    roomId: roomId,
    userId: socket.id,
    card: card,
    action: action,
  });
};

export const handleLeave = (socket, roomId) => {
  socket.emit("leave-room", { roomId: roomId }, handleStatus);
};
