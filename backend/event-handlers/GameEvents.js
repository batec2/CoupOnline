import GameActions from "../lib/actionEnum.js";

export const registerGameHandlers = (io, socket, rooms) => {
  socket.on("normal-action", ({ roomId, userId, action }) => {
    broadcastResponseRequest(socket, roomId, userId, action);
    console.log(action);
  });

  socket.on("response-action", ({ roomId, requestId, action }) => {
    console.log(requestId + " " + action);
    if (
      action === GameActions.BlockAssassinate ||
      action === GameActions.BlockAid ||
      action === GameActions.BlockStealAsCaptain ||
      action === GameActions.BlockStealAsAmbass
    ) {
      io.to(requestId).emit("block", {
        responseAction: {
          userId: socket.id,
          action: action,
        },
      });
    } else if (action === GameActions.CalloutLie) {
      console.log("Callout Lie");
      io.to(requestId).emit("called-out", {
        responseAction: {
          userId: socket.id,
          action: action,
        },
      });
    }
  });
};

const broadcastResponseRequest = (socket, roomId, userId, action) => {
  socket.to(roomId).emit("player-choice", {
    responseAction: {
      userId: userId,
      action: action,
    },
  });
};
