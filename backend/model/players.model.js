import mongoose from "mongoose";

const PlayerSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  age: Number,
  games: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "games",
    },
  ],
});

const Player = mongoose.model("players", PlayerSchema);

export default Player;