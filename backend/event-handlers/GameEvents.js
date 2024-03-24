import GameActions from "../lib/actionEnum.js";
import { emitUpdate } from "./GameEmitters.js";
import ChooseCard from "../lib/chooseCardEnum.js";
import CardInfo from "../lib/CardInfo.js";

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

export const registerGameHandlers = (io, socket, rooms) => {
  /**
   *
   * @param {*} roomId
   * @param {*} chooserId - user who has to pick a card
   * @param {*} initialUserId - first user in event chain
   * @param {*} initialAction - first action in event chain
   * @param {*} responseId - responding user
   * @param {*} responseAction - responding action
   */
  const emitChooseCard = (
    roomId,
    chooserId,
    initialUserId,
    initialAction,
    responseId,
    responseAction
  ) => {
    io.to(roomId).emit("choose-card", {
      chooserId: chooserId,
      initialUserId: initialUserId,
      initialAction: initialAction,
      responseId: responseId,
      responseAction: responseAction,
    });
  };

  /**
   * For asking players for block/callout actions
   * @param {*} io
   * @param {*} socket
   * @param {*} rooms
   * @param {*} recv
   * @returns
   */
  const onNormalAction = ({
    roomId,
    initialUserId,
    initialAction,
    targetId,
  }) => {
    console.log(
      `${initialUserId} is trying to ${GameActions[initialAction]} with target ${targetId}`
    );

    const room = rooms[roomId];
    const state = room.state;
    switch (initialAction) {
      case Income: {
        handleAction(state, initialUserId, initialAction);
        state.incrementTurn();
        emitUpdate(io, room);
        return;
      }
      case Coup: {
        state.decreasePlayerMoney(initialUserId, 7);
        emitChooseCard(
          roomId,
          targetId,
          initialUserId,
          initialAction,
          null,
          null
        );
        return;
      }
    }

    socket.to(roomId).emit("choose-response", {
      initialUserId: initialUserId,
      initialAction: initialAction,
    });
  };

  /**
   * For receiving response actions
   * @param {*} io
   * @param {*} roomId
   * @param {*} requestId - Id of the player being blocked/responded
   * @param {string} requestAction - Action being responded to
   * @param {*} action - Type of response action
   */
  const onResponseAction = ({
    roomId,
    initialUserId,
    initialAction,
    responseAction,
  }) => {
    const room = rooms[roomId];
    const state = room.state;
    const responseId = socket.id;

    if (
      responseAction === BlockAssassinate ||
      responseAction === BlockAid ||
      responseAction === BlockStealAsCaptain ||
      responseAction === BlockStealAsAmbass
    ) {
      console.log(
        `${responseId} is blocking ${initialUserId} action of ${GameActions[initialAction]}`
      );
      io.to(initialUserId).emit("block", {
        responseAction: {
          userId: socket.id,
          action: responseAction,
        },
      });
    } else if (responseAction === CalloutLie) {
      console.log(
        `${responseId} is calling out ${initialUserId} action of ${GameActions[initialAction]}`
      );
      // Tells the person being called out to select a card to show
      emitChooseCard(
        roomId,
        initialUserId,
        initialUserId,
        initialAction,
        responseId,
        responseAction
      );
    } else if (responseAction === Pass) {
      console.log(`${responseId} is passing`);
      state.incrementPassCount();
      //if all players pass
      if (state.passCount === state.playerCount - 1) {
        handleAction(state, initialUserId, initialAction);
        state.incrementTurn();
        emitUpdate(io, room);
        state.resetPassCount();
      }
    }
  };

  const handleAction = (state, userId, action) => {
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
  };

  /**
   * Action for Choose-card event from the client
   * @param {*} io
   * @param {*} socket
   * @param {*} rooms
   * @param {*} recv
   * @returns
   */
  const onChooseCard = ({
    roomId,
    chooserId,
    initialUserId,
    initialAction,
    responseId,
    responseAction,
    card,
    chooseActionType,
  }) => {
    const room = rooms[roomId];
    const state = room.state;

    switch (chooseActionType) {
      case ChooseCard.Loose: {
        console.log(
          `${chooserId} is choosing to lose his ${
            CardInfo[state.getPlayerCard(chooserId, card)].character
          }`
        );
        state.incrementTurn();
        state.loseCard(chooserId, card);
        emitUpdate(io, room);
        break;
      }
      case ChooseCard.Exchange: {
        break;
      }
      case ChooseCard.Show: {
        // card shown gets checked
        console.log(
          `${chooserId} is showing ${
            CardInfo[state.getPlayerCard(chooserId, card)].character
          }`
        );
        //If the called out player shows the correct card the calling out player
        //chooses a card to loose
        if (state.checkCard(chooserId, card, initialAction)) {
          handleAction(state, chooserId, initialAction);
          emitChooseCard(
            roomId,
            responseId,
            initialUserId,
            initialAction,
            null,
            GameActions.LooseCallout
          );
          return;
        }
        state.incrementTurn();
        state.loseCard(initialUserId, card);
        emitUpdate(io, room);
      }
    }
  };

  socket.on("normal-action", onNormalAction);
  socket.on("response-action", onResponseAction);
  socket.on("choose-card", onChooseCard);
};
