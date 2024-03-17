import GameActions from "../lib/actionEnum.js";
import { emitNextTurn } from "./GameEmitters.js";

const {
  Income,
  Aid,
  Coup,
  Taxes,
  Assassinate,
  Exchange,
  Steal,
  BlockAid,
  BlockStealAsAmbass,
  BlockStealAsCaptain,
  BlockAssassinate,
  CalloutLie,
} = GameActions;

const broadcastResponseRequest = (io, socket, rooms, recv) => {
  const { roomId, userId, action } = recv;
  const room = rooms[roomId];
  if (action === Income) {
    room.state.incrementTurn();
    emitNextTurn(io, roomId, room.state.currentTurnId);
    return;
  }

  socket.to(roomId).emit("player-choice", {
    responseAction: {
      userId: userId,
      action: action,
    },
  });
};

export const registerGameHandlers = (io, socket, rooms) => {
  socket.on("normal-action", (recv) => {
    broadcastResponseRequest(io, socket, rooms, recv);
  });

  socket.on("response-action", ({ roomId, requestId, action }) => {
    console.log(requestId + " " + action);
    if (
      action === BlockAssassinate ||
      action === BlockAid ||
      action === BlockStealAsCaptain ||
      action === BlockStealAsAmbass
    ) {
      io.to(requestId).emit("block", {
        responseAction: {
          userId: socket.id,
          action: action,
        },
      });
    } else if (action === CalloutLie) {
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
