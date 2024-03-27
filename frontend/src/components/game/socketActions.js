import handleStatus from "@/lib/handleStatus";

/**
 * Sends a action to the server
 * @param {Object} socket - Global Socket Object
 * @param {string} roomId - Current room id
 * @param {string} action - Action number
 */
export const handleNormalAction = (socket, roomId, action, targetId) => {
  socket.emit("normal-action", {
    roomId: roomId,
    initialUserId: socket.id,
    initialAction: action,
    targetId: targetId,
  });
};

/**
 * Sends an response action with the Id of the player being blocked
 * @param {Object} socket - Global Socket Object
 * @param {string} roomId - Current room id
 * @param {string} responseAction - Block/response action
 */
export const handleResponseAction = (socket, roomId, responseAction) => {
  socket.emit("response-action", {
    roomId: roomId,
    responseAction: responseAction,
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

export const handleLeave = (socket, roomId) => {
  socket.emit("leave-room", { roomId: roomId }, handleStatus);
};
