import mongoose from "mongoose";

const GameSchema = new mongoose.Schema({
  //Game ID which will be auto generated
  active: Boolean, //is game active
  //amount of players, can prob be removed and just do a .length on players
  playerCount: Number,
  //player ids and their initial cards
  players: [
    {
      player: { type: mongoose.Schema.Types.ObjectId, ref: "players" },
      cardOne: Number,
      cardTwo: Number,
    },
  ],
  //winner null if no winner
  winner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "players",
  },
  rounds: [
    {
      roundNumber: Number,
      //Each round records all the players actions
      actions: [
        {
          //Player
          playerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "players",
          },
          //target
          targetId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "players",
          },
          //String or number to correspond to action ex: stealing===1 or just
          //have string 'stealing'
          action: Number,
          coins: Number,
          //Current cards
          cardOne: Number,
          cardTwo: Number,
          //list of counter actions ex: p1: steal counter (p2: block p1: lie)
          counterAction: [
            {
              action: Number,
              //Player making the counteraction
              playerId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "players",
              },
              //Player being counter acted
              targetId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "players",
              },
            },
          ],
        },
      ],
    },
  ],
});

const Games = mongoose.model("games", GameSchema);

export default Games;
