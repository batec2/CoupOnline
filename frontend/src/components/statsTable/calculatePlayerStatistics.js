/**
 * Calculate statistics for all players.
 * @param {Object} param0 - Object containing players and games data.
 * @param {Array} param0.players - Array of player objects.
 * @param {Array} param0.games - Array of game objects.
 * @returns {Array} - Array of player statistics objects.
 */
const calculatePlayerStatistics = ({ players, games }) => {
  // Map through each player to calculate statistics
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
