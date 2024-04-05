import { GameActions, isBlockAction } from "./constants/actionEnum.js";
import { emitPartialUpdate, emitUpdate } from "./GameEmitters.js";
import ChooseCard from "./constants/chooseCardEnum.js";
import CardInfo from "./constants/CardInfo.js";

const {
  Income,
  Aid,
  Coup,
  Taxes,
  Assassinate,
  Exchange,
  Steal,
  CalloutLie,
  Pass,
} = GameActions;

const { Show, Loose, Exchange: ExchangeType } = ChooseCard;
/**
 * Registers game listeners for game actions
 * @param {Object} io
 * @param {Object} socket
 * @param {Object} rooms
 */
export const registerGameHandlers = (io, socket, rooms) => {
  const { id } = socket.handshake.headers;

  const handleEventLogs = (eventString, state, roomId) => {
    socket.to(roomId).emit("event-log", { eventString: eventString });
    state.addToEventLog(eventString);
    console.log(eventString);
  };

  /**
   *
   * @param {*} roomId
   * @param {*} chooserId - user who has to pick a card
   * @param {*} initialUserId - first user in event chain
   * @param {*} initialAction - first action in event chain
   * @param {*} responseId - responding user
   * @param {*} responseAction - responding action
   */
  const emitChooseCard = (roomId, chooserId, chooseType, state, room) => {
    if (state.checkLoser(chooserId)) {
      handleEventLogs(
        `${chooserId} has no more cards to lose such choose card next turn`,
        state,
        roomId
      );
      nextTurnAndUpdate(state, roomId, room);
      return;
    }
    io.to(roomId).emit("choose-card", {
      chooserId: chooserId,
      chooseType: chooseType,
      initialUserId: state.initialUserId,
      initialAction: state.initialAction,
      responseId: state.initialResponseId,
      responseAction: state.initialResponseAction,
      secondaryResponseId: state.secondaryResponseId,
      secondaryResponseAction: state.secondaryAction,
    });
  };

  const nextTurnAndUpdate = (state, roomId, room) => {
    state.incrementTurn();
    emitUpdate(io, roomId, room);
  };

  /**
   *
   * @param {*} initialUserId - first user in event chain
   * @param {*} initialAction - first action in event chain
   * @param {*} responseId - responding user
   * @param {*} responseAction - responding action
   */
  const emitBlockAction = (roomId, state) => {
    io.to(roomId).emit("blocked", {
      initialUserId: state.initialUserId,
      initialAction: state.initialAction,
      responseId: state.initialResponseId,
      responseAction: state.initialResponseAction,
    });
  };

  const emitExchangeCards = (roomId, state) => {
    io.to(roomId).emit("exchange-cards", {
      chooserId: state.initialUserId,
      exchangeCards: state.generateCards(),
      playersCards: state.getPlayerCards(state.initialUserId),
    });
  };

  /**
   *
   * @param {*} roomId
   * @param {*} room
   * @param {*} state
   * @param {boolean} nextTurn
   */
  const handleAction = (roomId, room, state, nextTurn) => {
    state.isInitialActionResolved = true;
    switch (state.initialAction) {
      case Aid: {
        handleEventLogs(
          `${state.initialUserId} is Choosing to get Aid`,
          state,
          roomId
        );
        state.increasePlayerMoney(state.initialUserId, 2);
        if (nextTurn) {
          nextTurnAndUpdate(state, roomId, room);
        }
        break;
      }
      case Coup: {
        handleEventLogs(
          `${state.initialUserId} is Choosing to coup ${state.targetId}`,
          state,
          roomId
        );
        state.decreasePlayerMoney(state.initialUserId, 7);
        emitChooseCard(roomId, state.targetId, Loose, state, room);
        break;
      }
      case Income: {
        handleEventLogs(
          `${state.initialUserId} is Choosing to get Income`,
          state,
          roomId
        );
        if (state.getPlayerCoins(state.initialUserId) < 10) {
          state.increasePlayerMoney(state.initialUserId, 1);
        } else {
          handleEventLogs(
            `${state.initialUserId} has 10 or more coins and is unable to take income`,
            state,
            roomId
          );
        }
        if (nextTurn) {
          nextTurnAndUpdate(state, roomId, room);
        }
        break;
      }
      case Taxes: {
        handleEventLogs(
          `${state.initialUserId} is Choosing to get Taxes`,
          state,
          roomId
        );
        state.increasePlayerMoney(state.initialUserId, 3);
        if (nextTurn) {
          nextTurnAndUpdate(state, roomId, room);
        }
        break;
      }
      case Steal: {
        handleEventLogs(
          `${state.initialUserId} is Choosing to get Steal from ${state.targetId}`,
          state,
          roomId
        );
        state.increasePlayerMoney(state.initialUserId, 2);
        state.decreasePlayerMoney(state.targetId, 2);
        if (nextTurn) {
          nextTurnAndUpdate(state, roomId, room);
        }
        break;
      }
      case Assassinate: {
        handleEventLogs(
          `${state.initialUserId} is Choosing to Assassinate ${state.targetId}`,
          state,
          roomId
        );
        state.decreasePlayerMoney(state.initialUserId, 3);
        emitChooseCard(roomId, state.targetId, Loose, state, room);
        break;
      }
      case Exchange: {
        handleEventLogs(
          `${state.initialUserId} is Choosing to Exchange Cards`,
          state,
          roomId
        );
        emitExchangeCards(roomId, state);
      }
    }
  };

  /**
   * For asking players for block/callout actions
   * @param {*} io
   * @param {*} socket
   * @param {*} rooms
   * @param {*} recv
   * @returns
   */
  const onNormalAction = ({ roomId, initialAction, targetId }) => {
    const room = rooms[roomId];
    const state = room.state;

    handleEventLogs(
      `${id} is trying to ${GameActions[initialAction]} with target ${targetId}`,
      state,
      roomId
    );

    //Sets the intial target
    state.targetId = targetId;
    state.initialUserId = id;
    state.initialAction = initialAction;

    if (state.initialAction !== Coup && state.initialAction !== Income) {
      //Emits to everyone except the current player
      socket.to(roomId).emit("choose-response", {
        initialUserId: state.initialUserId,
        initialAction: state.initialAction,
        targetId: state.targetId,
      });
      return;
    }
    handleAction(roomId, room, state, true);
  };

  /**
   * For receiving response actions
   * @param {*} initialUserId - Id of the player being blocked/responded
   * @param {string} initialAction - Action being responded to
   * @param {*} responseAction - Type of response action
   * @param {*} initialResponseId
   * @param {*} initialResponseAction
   */
  const onResponseAction = ({ roomId, responseAction }) => {
    const room = rooms[roomId];
    const state = room.state;

    // If the action is a response to the first normal action
    if (state.initialResponseId === null) {
      // Sets the initial response in state
      if (responseAction !== Pass) {
        state.initialResponseId = id;
        state.initialResponseAction = responseAction;
      }

      // If Block action emits a new event to client
      if (isBlockAction(state.initialResponseAction)) {
        handleEventLogs(
          `${id} is blocking ${state.initialUserId} action of ${
            GameActions[state.initialAction]
          }`,
          state,
          roomId
        );
        state.resetPassCount();
        emitBlockAction(roomId, state);
      }
      // If response is a callout askes the initial user to show a card
      else if (responseAction === CalloutLie) {
        handleEventLogs(
          `${id} is calling out ${state.initialUserId} action of ${
            GameActions[state.initialAction]
          }`,
          state,
          roomId
        );
        state.resetPassCount();
        emitChooseCard(roomId, state.initialUserId, Show, state, room);
      }
      // If all players pass the initial action goes through
      else if (responseAction === Pass) {
        handleEventLogs(`${id} is passing`, state, roomId);
        state.incrementPassCount();

        if (state.passCount === state.playerCount - 1) {
          handleAction(roomId, room, state, true);
        }
      }
      return;
    }

    // Pass increments counter
    if (responseAction === Pass) {
      handleEventLogs(`${id} is passing`, state, roomId);
      state.incrementPassCount();
      if (state.passCount === state.playerCount - 1) {
        if (isBlockAction(state.initialResponseAction)) {
          nextTurnAndUpdate(state, roomId, room);
          return;
        }
        handleAction(roomId, room, state, true);
      }
    }
    // Callout causes initial response to show card
    else if (responseAction === CalloutLie) {
      state.secondaryResponseId = id;
      state.secondaryAction = responseAction;
      handleEventLogs(
        `${id} is calling-out ${state.initialResponseAction} action of ${
          GameActions[state.initialResponseAction]
        }`,
        state,
        roomId
      );
      console.log(`
        ${id} is calling-out ${state.initialResponseAction} action of ${
        GameActions[state.initialResponseAction]
      }`);
      state.resetPassCount();
      emitChooseCard(roomId, state.initialResponseId, Show, state, room);
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
  const onChooseCard = ({ roomId, card, chooseActionType }) => {
    const room = rooms[roomId];
    const state = room.state;

    switch (chooseActionType) {
      case ChooseCard.Loose: {
        handleEventLogs(
          `${id} is choosing to lose his ${
            CardInfo[state.getPlayerCard(id, card)].character
          }`,
          state,
          roomId
        );
        state.loseCard(id, card);
        emitPartialUpdate(io, room);
        if (state.isInitialActionResolved) {
          nextTurnAndUpdate(state, roomId, room);
          return;
        }
        handleAction(roomId, room, state, true);
        break;
      }

      case ChooseCard.Show: {
        // card shown gets checked
        handleEventLogs(
          `${id} is showing ${
            CardInfo[state.getPlayerCard(id, card)].character
          }`,
          state,
          roomId
        );
        // If a Block action is called out
        if (
          state.initialResponseAction &&
          isBlockAction(state.initialResponseAction) &&
          state.secondaryAction
        ) {
          onSecondResponse(roomId, room, state, card);
        }
        // Callout happened on first response
        else if (state.checkCard(id, card, state.initialAction)) {
          onFirstResponse(roomId, room, state, card);
        } else {
          handleEventLogs(
            `${id} showed the wrong card for ${
              GameActions[state.initialAction]
            } and ${id} must choose to lose a card`,
            state,
            roomId
          );
          state.loseCard(id, card);
          nextTurnAndUpdate(state, roomId, room);
        }
      }
    }
  };

  //If the called out player shows the correct card the calling out player
  const onFirstResponse = (roomId, room, state, card) => {
    //chooses a card to loose
    handleEventLogs(
      `${id} showed the proper card for ${
        GameActions[state.initialAction]
      } and ${state.initialResponseId} must choose to lose a card`,
      state,
      roomId
    );
    state.swapCards(id, card);
    emitChooseCard(roomId, state.initialResponseId, Loose, state, room);
    return;
  };

  const onSecondResponse = (roomId, room, state, card) => {
    // Checks if responder has card for block
    if (state.checkCard(id, card, state.initialResponseAction)) {
      handleEventLogs(
        `${id} showed the proper card for ${
          GameActions[state.initialResponseAction]
        } and ${state.secondaryResponseId} must choose to lose a card`,
        state,
        roomId
      );
      // If the player can Block then the person calling loses a card
      state.swapCards(id, card);
      if (isBlockAction(state.initialResponseAction)) {
        handleEventLogs(
          `${id} blocks action of ${
            GameActions[state.initialAction]
          }, and swaps his card with a new card`,
          state,
          roomId
        );
        state.isInitialActionResolved = true;
      }
      emitChooseCard(roomId, state.secondaryResponseId, Loose, state, room);
      return;
    }
    // If the player showing cannot block they lose card
    state.loseCard(id, card);
    emitPartialUpdate(io, room);
    handleAction(roomId, room, state, true);
  };

  const onExchangeCards = ({ roomId, chosenCards, returnedCards }) => {
    const room = rooms[roomId];
    const state = room.state;
    state.exchangeCards(id, chosenCards);
    state.returnCards(returnedCards);
    nextTurnAndUpdate(state, roomId, room);
  };

  socket.on("normal-action", onNormalAction);
  socket.on("response-action", onResponseAction);
  socket.on("choose-card", onChooseCard);
  socket.on("exchange-cards", onExchangeCards);
};
