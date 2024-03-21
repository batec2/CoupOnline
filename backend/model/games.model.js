import mongoose from "mongoose";

const GameSchema = new mongoose.Schema({
  //Game ID which will be auto generated
  active: Boolean, //is game active
  //amount of players, can prob be removed and just do a .length on players
  playerCount: Number,
  //player ids and their initial cards
  winner: { type: mongoose.Schema.Types.ObjectId, ref: "players" },
  players: [
    {
      player: { type: mongoose.Schema.Types.ObjectId, ref: "players" },
      cardOne: Number,
      cardTwo: Number,
    },
  ],
  turns: [
    {
      player: { type: mongoose.Schema.Types.ObjectId, ref: "players" },
      target: { type: mongoose.Schema.Types.ObjectId, ref: "players" },
      action: Number,
    },
  ],
});

const Games = mongoose.model("games", GameSchema);

export default Games;
