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
      _id: false, // remove automatic generation of _id for embedded documents
      player: { type: mongoose.Schema.Types.ObjectId, ref: "players" },
    },
  ],
  // Game logs array
  eventLog: [String],
});

const Games = mongoose.model("games", GameSchema);

export default Games;
