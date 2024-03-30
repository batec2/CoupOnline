import CardInfo from "./constants/CardInfo.js";
import GameCard from "./constants/cardEnum.js";

export class GameState {
  //3 of each Duke,Assassin,Captain,Ambassador,Contessa
  currentPlayer = 0;
  playerCount = 0;
  players = [];
  playerState = {};
  deck = [3, 3, 3, 3, 3];
  roundNumber = 0;
  round = {};
  passCount = 0;

  // Turn State
  targetId = null;
  initialUserId = null;
  initialAction = null;
  initialResponseId = null;
  initialResponseAction = null;
  isBlocked = false;

  constructor(players) {
    this.playerCount = players.length;
    this.players = players;
    this.initPlayers();
  }

  get currentPlayer() {
    return this.currentPlayer;
  }
  get playerCount() {
    return this.playerCount;
  }
  get players() {
    return this.players;
  }
  get roundNumber() {
    return this.roundNumber;
  }
  get round() {
    return this.round;
  }
  get deck() {
    return this.deck;
  }

  get currentTurnId() {
    return this.players[this.currentPlayer];
  }

  get playerCards() {
    return this.playerState;
  }
  get passCount() {
    return this.passCount;
  }

  get targetId() {
    return this.targetId;
  }

  get initialUserId() {
    return this.initialUserId;
  }
  get initialAction() {
    return this.initialAction;
  }

  get initialResponseId() {
    return this.initialResponseId;
  }

  get initialResponseAction() {
    return this.initialResponseAction;
  }

  get isBlocked() {
    return this.isBlocked;
  }

  set targetId(targetId) {
    this.targetId = targetId;
  }

  set initialUserId(initialUserId) {
    this.initialUserId = initialUserId;
  }
  set initialAction(initialAction) {
    this.initialAction = initialAction;
  }

  set initialResponseId(initialResponseId) {
    this.initialResponseId = initialResponseId;
  }

  set initialResponseAction(initialResponseAction) {
    this.initialResponseAction = initialResponseAction;
  }

  set isBlocked(isBlocked) {
    this.isBlocked = isBlocked;
  }

  resetTurnState() {
    this.targetId = null;
    this.initialUserId = null;
    this.initialAction = null;
    this.initialResponseId = null;
    this.initialResponseId = null;
    this.isBlocked = false;
  }

  /**
   *
   * @param {*} userId - player called out
   * @param {*} card - card shown
   * @param {*} action - action being called out
   */
  checkCard(userId, card, initialAction) {
    const playerCard = this.playerState[userId].gameCards[card];
    if (CardInfo[playerCard].validActions.includes(initialAction)) {
      return true;
    }
    return false;
  }

  loseCard(player, card) {
    const loser = this.playerState[player];
    loser.gameCards[card] = GameCard.Eliminated;
    //Sets the player eliminated if player losses both cards and removes them,
    //from the turn counter
    if (
      loser.gameCards[0] === GameCard.Eliminated &&
      loser.gameCards[1] === GameCard.Eliminated
    ) {
      loser.eliminated = true;
      this.players = this.players.filter((ids) => ids !== player);
    }
  }

  getPlayer(player) {
    return this.playerState[player];
  }
  getPlayerCard(player, card) {
    return this.playerState[player].gameCards[card];
  }
  getPlayerCards(player) {
    return this.playerState[player].gameCards;
  }

  addRound(round) {
    this.round[this.roundNumber] = round;
    this.roundNumber += 1;
  }

  incrementPassCount() {
    this.passCount += 1;
  }

  resetPassCount() {
    this.passCount = 0;
  }

  incrementRound() {
    this.roundNumber += 1;
  }

  incrementTurn() {
    if (this.currentPlayer === this.playerCount - 1) {
      this.currentPlayer = 0;
    } else {
      this.currentPlayer += 1;
    }
  }

  increasePlayerMoney(userId, amount) {
    this.playerState[userId].coins += amount;
  }
  decreasePlayerMoney(userId, amount) {
    this.playerState[userId].coins -= amount;
  }

  initPlayers() {
    this.players.forEach((player) => {
      this.playerState[player] = { gameCards: {}, coins: 0 };
      this.playerState[player].gameCards = this.generateCards();
      this.playerState[player].coins = 14;
      this.playerState[player].eliminated = false;
    });
  }

  generateCards() {
    const gameCards = {};
    // Generates 2 cards
    for (let i = 0; i < 2; i++) {
      gameCards[i] = this.selectRandomCard();
    }
    return gameCards;
  }

  selectRandomCard() {
    while (true) {
      const index = Math.floor(Math.random() * this.deck.length);
      if (this.deck[index] != 0) {
        this.deck[index] -= 1;
        return index;
      }
    }
  }

  /**
   * Swaps a players card with a random card and returns card from player
   * back into the deck
   * @param {*} player
   * @param {*} card
   */
  swapCards(player, card) {
    const swap = this.playerState[player].gameCards[card];
    this.playerState[player].gameCards[card] = this.selectRandomCard();
    this.deck[swap] += 1;
  }

  /**
   * Checks if there is more than one player still not eliminated from the game,
   * and returns the winner if there is one
   * @returns {hasWinner: boolean, winner?: string}
   */
  checkEndGame() {
    let count = 0;
    let winner = null;
    Object.keys(this.playerState).forEach((player) => {
      if (!this.playerState[player].eliminated) {
        count += 1;
        winner = player;
      }
    });
    if (count <= 1) {
      return { hasWinner: true, winner: winner };
    }
    return { hasWinner: false, winner: null };
  }

  checkLoser(player) {
    return this.playerState[player].eliminated;
  }
}
