export class GameState {
  currentPlayer = 0;
  playerCount = 0;
  players = [];
  roundNumber = 0;
  round = {};

  constructor(players) {
    this.playerCount = players.length;
    this.players = players;
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

  get currentTurnId() {
    return this.players[this.currentPlayer];
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
}
