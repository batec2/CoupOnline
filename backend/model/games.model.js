import mongoose from "mongoose";

const GameSchema = new mongoose.Schema({
  // Game ID which will be auto generated
  active: Boolean, // Is game active
  // Amount of players (might not need this)
  playerCount: Number,
  // Winner of the game
  winner: { type: mongoose.Schema.Types.ObjectId, ref: "players" },
  // Players in the game
  players: [
    {
      player: { type: mongoose.Schema.Types.ObjectId, ref: "players" },
      // cardOne: Number,
      // cardTwo: Number,
    },
  ],
  // turns: [
  //   {
  //     player: { type: mongoose.Schema.Types.ObjectId, ref: "players" },
  //     target: { type: mongoose.Schema.Types.ObjectId, ref: "players" },
  //     action: Number,
  //   },
  // ],
  // Game logs array
  eventLog: [String],
});

const Games = mongoose.model("games", GameSchema);

export default Games;
