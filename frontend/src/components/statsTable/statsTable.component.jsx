import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const StatsTable = ({ players, games }) => {
  // Calculate statistics for all players
  const playerStatistics = players.map((player) => {
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

  return (
    <Table>
      <TableCaption>Global Statistics</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Username</TableHead>
          <TableHead>Games Played</TableHead>
          <TableHead>Games Won</TableHead>
          <TableHead>Games Lost</TableHead>
          <TableHead>Win Lose Ratio</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {playerStatistics.map((stats, index) => (
          <TableRow key={index}>
            <TableCell>
              {
                players.find((player) => player._id === stats.playerId)
                  ?.userName
              }
            </TableCell>
            <TableCell>{stats.gamesPlayed}</TableCell>
            <TableCell>{stats.gamesWon}</TableCell>
            <TableCell>{stats.gamesLost}</TableCell>
            <TableCell>
              {stats.gamesLost === 0 ? "N/A" : stats.gamesWon / stats.gamesLost}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default StatsTable;
