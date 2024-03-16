import GameActions from "../lib/actionEnum.js";

export const registerGameHandlers = (io, socket, rooms) => {
  socket.on("normal-action", ({ roomId, userId, action }) => {
    broadcastResponseRequest(socket, roomId, userId, action);
    console.log(action);
  });

  socket.on("response-action", ({ roomId, requestId, action }) => {
    console.log(requestId + " " + action);
    switch (action) {
      case GameActions.BlockAid: {
        console.log("Block Aid");
        break;
      }
      case GameActions.BlockAssassinate: {
        console.log("Block Assassinate");
        break;
      }
      case GameActions.BlockSteal: {
        console.log("Block Steal");
        break;
      }
      case GameActions.CalloutLie: {
        console.log("Callout Lie");
        io.to(requestId).emit("called-out", { calloutId: socket.id });
        break;
      }
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
