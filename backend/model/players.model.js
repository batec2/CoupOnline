import mongoose from "mongoose";

const PlayerSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  screenName: { type: String, required: true },
  email: { type: String, required: true },
  games: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "games",
    },
  ],
});

const Player = mongoose.model("players", PlayerSchema);

export default Player;