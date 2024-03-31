import { GameActions, isBlockAction } from "./constants/actionEnum.js";
import { emitUpdate } from "./GameEmitters.js";
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
  const emitChooseCard = (roomId, chooserId, state) => {
    io.to(roomId).emit("choose-card", {
      chooserId: chooserId,
      initialUserId: state.initialUserId,
      initialAction: state.initialAction,
      responseId: state.initialResponseId,
      responseAction: state.initialResponseAction,
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
   * @param {*} state
   * @param {*} userId
   * @param {*} targetId
   * @param {*} action
   * @param {*} isBlocked
   * @returns
   */
  const handleAction = (roomId, room, state, nextTurn) => {
    switch (state.initialAction) {
      case Coup: {
        state.decreasePlayerMoney(state.initialUserId, 7);
        emitChooseCard(roomId, state.targetId, state);
        break;
      }
      case Income: {
        state.increasePlayerMoney(state.initialUserId, 1);
        if (nextTurn) {
          nextTurnAndUpdate(state, roomId, room);
        }
        break;
      }
      case Taxes: {
        state.increasePlayerMoney(state.initialUserId, 3);
        if (nextTurn) {
          nextTurnAndUpdate(state, roomId, room);
        }
        break;
      }
      case Steal: {
        state.increasePlayerMoney(state.initialUserId, 2);
        state.decreasePlayerMoney(state.targetId, 2);
        if (nextTurn) {
          nextTurnAndUpdate(state, roomId, room);
        }
        break;
      }
      case Assassinate: {
        state.initialResponseAction = null;
        state.initialResponseId = null;
        emitChooseCard(roomId, state.targetId, state);
        break;
      }
      case Exchange: {
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
    //Sets the intial target
    state.targetId = targetId;
    state.initialUserId = initialUserId;
    state.initialAction = initialAction;

    if (state.initialAction !== Coup && state.initialAction !== Income) {
      //Emits to everyone except the current player
      socket.to(roomId).emit("choose-response", {
        initialUserId: state.initialUserId,
        initialAction: state.initialAction,
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
    const responseId = socket.id;
    // If the action is a response to the first normal action
    if (state.initialResponseId === null) {
      // Sets the initial response in state
      if (responseAction !== Pass) {
        state.initialResponseId = socket.id;
        state.initialResponseAction = responseAction;
      }

      // If Block action emits a new event to client
      if (isBlockAction(state.initialResponseAction)) {
        console.log(
          `${socket.id} is blocking ${state.initialUserId} action of ${
            GameActions[state.initialAction]
          }`
        );
        emitBlockAction(roomId, state);
      }
      // If response is a callout askes the initial user to show a card
      else if (responseAction === CalloutLie) {
        console.log(
          `${socket.id} is calling out ${state.initialUserId} action of ${
            GameActions[state.initialAction]
          }`
        );
        emitChooseCard(roomId, state.initialUserId, state);
      }
      // If all players pass the initial action goes through
      else if (responseAction === Pass) {
        console.log(`${responseId} is passing`);
        state.incrementPassCount();

        if (state.passCount === state.playerCount - 1) {
          handleAction(roomId, room, state, true);
        }
      }
      return;
    }

    // If a block action gets called out
    if (responseAction === Pass) {
      nextTurnAndUpdate(state, roomId, room);
    } else if (responseAction === CalloutLie) {
      console.log(
        `${socket.id} is blocking ${state.initialResponseAction} action of ${
          GameActions[state.initialResponseAction]
        }`
      );
      emitChooseCard(roomId, state.initialResponseId, state);
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
        console.log(
          `${socket.id} is choosing to lose his ${
            CardInfo[state.getPlayerCard(socket.id, card)].character
          }`
        );
        state.loseCard(socket.id, card);
        nextTurnAndUpdate(state, roomId, room);
        break;
      }

      case ChooseCard.Show:
        {
          // card shown gets checked
          console.log(
            `${socket.id} is showing ${
              CardInfo[state.getPlayerCard(socket.id, card)].character
            }`
          );
          // If a Block action is called out
          if (
            state.initialResponseAction &&
            isBlockAction(state.initialResponseAction)
          ) {
            if (state.checkCard(socket.id, card, state.initialResponseAction)) {
              console.log(
                `${socket.id} showed the proper card for ${
                  GameActions[state.initialResponseAction]
                } and ${state.initialUserId} must choose to lose a card`
              );
              // If the Person Can Block then the initial user loses a card
              state.initialResponseAction = GameActions.LooseCallout;
              state.swapCards(socket.id, card);
              emitChooseCard(roomId, state.initialUserId, state);
              return;
            }
            state.loseCard(socket.id, card);
            nextTurnAndUpdate(state, roomId, room);
            return;
          }
          // Callout happened on first response
          else if (state.checkCard(socket.id, card, state.initialAction)) {
            //If the called out player shows the correct card the calling out player
            //chooses a card to loose
            console.log(
              `${socket.id} showed the proper card for ${
                GameActions[state.initialAction]
              } and ${state.initialResponseId} must choose to lose a card`
            );
            // If a player calls out an Assassin and lose, they lose both cards
            if (state.initialAction === Assassinate) {
              state.loseCard(state.initialResponseId, 0);
              state.loseCard(state.initialResponseId, 1);
              state.swapCards(socket.id, card);
              nextTurnAndUpdate(state, roomId, room);
              return;
            }
            if (state.initialAction === Exchange) {
              nextTurnAndUpdate(state, roomId, room);
            }
            state.swapCards(socket.id, card);
            handleAction(roomId, room, state, false);
            emitChooseCard(roomId, state.initialResponseId, state);
            return;
          }
        }
        state.loseCard(state.initialUserId, card);
        nextTurnAndUpdate(state, roomId, room);
    }
  };

  const onExchangeCards = ({ roomId, chosenCards, returnedCards }) => {
    const room = rooms[roomId];
    const state = room.state;
    state.exchangeCards(socket.id, chosenCards);
    state.returnCards(returnedCards);
    nextTurnAndUpdate(state, roomId, room);
  };

  socket.on("normal-action", onNormalAction);
  socket.on("response-action", onResponseAction);
  socket.on("choose-card", onChooseCard);
  socket.on("exchange-cards", onExchangeCards);
};
