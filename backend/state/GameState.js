import GameCard from "../lib/cardEnum.js";

export class GameState {
  //3 of each Duke,Assassin,Captain,Ambassador,Contessa
  currentPlayer = 0;
  playerCount = 0;
  players = [];
  playerState = {};
  deck = [3, 3, 3, 3, 3];
  roundNumber = 0;
  round = {};

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

  loseCard(player, card) {
    this.playerState[player].gameCards[card] = GameCard.Eliminated;
  }

  getPlayer(player) {
    return this.playerState[player];
  }

  addRound(round) {
    this.round[this.roundNumber] = round;
    this.roundNumber += 1;
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
      this.playerState[player].coins = 2;
    });
  }

  generateCards() {
    const gameCards = {};
    // Generates 2 cards
    for (let i = 0; i < 2; i++) {
      //Select card
      while (true) {
        const index = Math.floor(Math.random() * this.deck.length);
        // if there is still a card left in deck
        if (this.deck[index] != 0) {
          this.deck[index] -= 1;
          gameCards[i] = index;
          break;
        }
      }
    }
    return gameCards;
  }
}
