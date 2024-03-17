export class GameState {
  //3 of each Duke,Assassin,Captain,Ambassador,Contessa
  currentPlayer = 0;
  playerCount = 0;
  players = [];
  playerCards = {};
  deck = [3, 3, 3, 3, 3];
  roundNumber = 0;
  round = {};

  constructor(players) {
    this.playerCount = players.length;
    this.players = players;
    this.generateCardsForAll();
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
    return this.playerCards;
  }

  getPlayersCards(player) {
    return this.playerCards[player];
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

  generateCardsForAll() {
    this.players.forEach((player) => {
      this.playerCards[player] = this.generateCards();
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
