import GameActions from "../lib/actionEnum.js";
import { emitUpdate } from "./GameEmitters.js";
import ChooseCard from "../lib/chooseCardEnum.js";

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
  Pass,
} = GameActions;

/**
 * For asking players for block/callout actions
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
    handleAction(io, room, userId, action);
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
 * For receiving response actions
 * @param {*} io
 * @param {*} roomId
 * @param {*} requestId - Id of the player being blocked/responded
 * @param {string} requestAction - Action being responded to
 * @param {*} action
 */
const onResponseAction = (io, socket, rooms, recv) => {
  const { roomId, requestId, requestAction, action } = recv;
  const room = rooms[roomId];
  const state = room.state;
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
    // Tells the person being called out to select a card to show
    io.to(requestId).emit("choose-card", {
      userId: socket.id,
      targetId: requestId,
      requestAction: GameActions.CalloutLie,
    });
  } else if (action === Pass) {
    state.incrementPassCount();
    //if all players pass
    if (state.passCount === state.playerCount - 1) {
      handleAction(io, room, requestId, requestAction);
      state.resetPassCount();
    }
  }
};

const handleAction = (io, room, userId, action) => {
  console.log(action);
  const state = room.state;
  switch (action) {
    case Income: {
      state.increasePlayerMoney(userId, 1);
      break;
    }
    case Taxes: {
      state.increasePlayerMoney(userId, 3);
      break;
    }
  }
  state.incrementTurn();
  emitUpdate(io, room);
};

const onTargetAction = (io, socket, rooms, recv) => {
  const { roomId, action, targetId } = recv;
  const room = rooms[roomId];
  const state = room.state;
  console.log(io, socket, rooms, recv);

  // Coup
  if (action === GameActions.Coup) {
    state.decreasePlayerMoney(socket.id, 7);
    io.to(roomId).emit("choose-card", {
      userId: socket.id,
      targetId: targetId,
      requestAction: GameActions.Coup,
    });
  }
};

/**
 * Action for Choose-card event from the client
 * @param {*} io
 * @param {*} socket
 * @param {*} rooms
 * @param {*} recv
 * @returns
 */
const onChooseCard = (io, socket, rooms, recv) => {
  const { roomId, userId, card, requestAction, action } = recv;
  const room = rooms[roomId];
  const state = room.state;

  switch (action) {
    case ChooseCard.Loose: {
      console.log("loose " + action);
      state.loseCard(userId, card);
      emitUpdate(io, room);
      break;
    }
    case ChooseCard.Exchange: {
      break;
    }
    case ChooseCard.Show: {
      // card shown gets checked
      console.log("show " + action);
      if (state.checkCard(userId, card, requestAction)) {
        io.to(roomId).emit("choose-card", {
          userId: socket.id,
          targetId: targetId,
          requestAction: GameActions.LooseCallout,
        });
        return;
      }
      state.incrementTurn();
      state.loseCard(userId, card);
      emitUpdate(io, room);
    }
  }
};

export const registerGameHandlers = (io, socket, rooms) => {
  socket.on("normal-action", (recv) => {
    broadcastResponseRequest(io, socket, rooms, recv);
  });

  socket.on("response-action", (recv) => {
    onResponseAction(io, socket, rooms, recv);
  });

  socket.on("target-action", (recv) => {
    onTargetAction(io, socket, rooms, recv);
  });

  socket.on("choose-card", (recv) => {
    onChooseCard(io, socket, rooms, recv);
  });
};
