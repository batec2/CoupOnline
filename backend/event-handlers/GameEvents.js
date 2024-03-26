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

  /**
   *
   * @param {*} state
   * @param {*} userId
   * @param {*} targetId
   * @param {*} action
   * @param {*} isBlocked
   * @returns
   */
  const handleAction = (roomId, room, state) => {
    // if (state.isBlocked && state.initialAction === Assassinate) {
    //   state.decreasePlayerMoney(userId, 3);
    //   return;
    // }
    switch (state.initialAction) {
      case Coup: {
        state.decreasePlayerMoney(state.initialUserId, 7);
        emitChooseCard(roomId, state.targetId, state);
        break;
      }
      case Income: {
        state.increasePlayerMoney(state.initialUserId, 1);
        state.incrementTurn();
        emitUpdate(io, room);
        break;
      }
      case Taxes: {
        state.increasePlayerMoney(state.initialUserId, 3);
        break;
      }
      case Steal: {
        state.increasePlayerMoney(state.initialUserId, 2);
        state.decreasePlayerMoney(state.targetId, 2);
        break;
      }
      case Assassinate: {
        emitChooseCard(roomId, state.targetId, state);
        break;
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

    if (initialAction !== Coup && initialAction !== Income) {
      //Emits to everyone except the current player
      socket.to(roomId).emit("choose-response", {
        initialUserId: initialUserId,
        initialAction: initialAction,
      });
      return;
    }

    handleAction(roomId, room, state);
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
      state.initialResponseId = socket.id;
      state.initialResponseAction = responseAction;

      // If Block action emits a new event to client
      if (isBlockAction(state.initialResponseAction)) {
        console.log(
          `${socket.id} is blocking ${state.initialAction} action of ${
            GameActions[state.initialAction]
          }`
        );
        emitBlockAction(state);
      }
      // If response is a callout askes the initial user to show a card
      else if (responseAction === CalloutLie) {
        console.log(
          `${socket.id} is calling out ${state.initialAction} action of ${
            GameActions[state.initialAction]
          }`
        );
        emitChooseCard(roomId, state.initialAction, state);
      }
      // If all players pass the initial action goes through
      else if (responseAction === Pass) {
        console.log(`${responseId} is passing`);
        state.incrementPassCount();

        if (state.passCount === state.playerCount - 1) {
          handleAction(roomId, room, state);
          state.incrementTurn();
          emitUpdate(io, room);
        }
      }
      return;
    }

    // If a block action gets called out
    if (responseAction === Pass) {
      state.incrementTurn();
      emitUpdate(io, room);
    } else if (responseAction === CalloutLie) {
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
      case ChooseCard.Show:
        {
          // card shown gets checked
          console.log(
            `${chooserId} is showing ${
              CardInfo[state.getPlayerCard(chooserId, card)].character
            }`
          );
          // If a Block action is called out
          if (isBlockAction(responseAction)) {
            if (state.checkCard(chooserId, card, responseAction)) {
              console.log(
                `${chooserId} showed the proper card for ${GameActions[responseAction]} and ${responseId} must choose to lose a card`
              );
              // If the Person Can Block then the initial user loses a card
              emitChooseCard(roomId, initialUserId, state);
              return;
            }
            state.incrementTurn();
            state.loseCard(chooserId, card);
            emitUpdate(io, room);
            return;
          } else if (state.checkCard(chooserId, card, initialAction)) {
            //If the called out player shows the correct card the calling out player
            //chooses a card to loose
            console.log(
              `${chooserId} showed the proper card for ${GameActions[initialAction]} and ${initialUserId} must choose to lose a card`
            );
            handleAction(roomId, room, state);
            emitChooseCard(roomId, responseId, state);
            return;
          }
        }
        state.incrementTurn();
        state.loseCard(initialUserId, card);
        emitUpdate(io, room);
    }
  };

  socket.on("normal-action", onNormalAction);
  socket.on("response-action", onResponseAction);
  socket.on("choose-card", onChooseCard);
};
