/**
 * Calculate statistics for all players.
 */
const calculatePlayerStatistics = ({ players, games }) => {
  return players.map((player) => {
    const playerId = player._id;
    let gamesPlayed = 0;
    let gamesWon = 0;
    let gamesLost = 0;

    games.forEach((game) => {
      if (game.players.some((player) => player.player === playerId)) {
        gamesPlayed++;
        if (game.winner === playerId) {
          gamesWon++;
        } else {
          gamesLost++;
        }
      }
    });

    return { playerId, gamesPlayed, gamesWon, gamesLost };
  });
};

export default calculatePlayerStatistics;
