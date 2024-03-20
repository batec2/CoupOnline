import GameActions from "../lib/actionEnum.js";
import { emitUpdate } from "./GameEmitters.js";

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

/**
 *
 * @param {*} io
 * @param {*} socket
 * @param {*} rooms
 * @param {*} recv
 * @returns
 */
const broadcastResponseRequest = (io, socket, rooms, recv) => {
  const { roomId, userId, action } = recv;
  const room = rooms[roomId];
  if (action === Income) {
    room.state.increasePlayerMoney(userId, 1);
    room.state.incrementTurn();
    emitUpdate(io, room);
    return;
  }
  socket.to(roomId).emit("player-choice", {
    responseAction: {
      userId: userId,
      action: action,
    },
  });
};

/**
 *
 * @param {*} io
 * @param {*} roomId
 * @param {*} requestId
 * @param {*} action
 */
const onResponseAction = (io, socket, recv) => {
  const { roomId, requestId, action } = recv;
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
};

const onTargetAction = (io, socket, rooms, recv) => {
  const { roomId, action, targetId } = recv;
  const room = rooms[roomId];
  const state = room.state;
  console.log(io, socket, rooms, recv);
  if (action === GameActions.Coup) {
    state.decreasePlayerMoney(socket.id, 7);
    io.to(roomId).emit("coup", { userId: socket.id, targetId: targetId });
  }
};

const onLoseCard = (io, socket, rooms, recv) => {
  const { roomId, userId, card } = recv;
  const room = rooms[roomId];
  const state = room.state;

  state.loseCard(userId, card);
  state.incrementTurn();
  emitUpdate(io, room);
};

export const registerGameHandlers = (io, socket, rooms) => {
  socket.on("normal-action", (recv) => {
    broadcastResponseRequest(io, socket, rooms, recv);
  });

  socket.on("response-action", (recv) => {
    onResponseAction(io, socket, recv);
  });

  socket.on("target-action", (recv) => {
    onTargetAction(io, socket, rooms, recv);
  });

  socket.on("lose-card", (recv) => {
    onLoseCard(io, socket, rooms, recv);
  });
};
