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
  const calculateStatistics = (playerId) => {
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

    return { gamesPlayed, gamesWon, gamesLost };
  };
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
        {players.map((player, index) => (
          <TableRow key={index}>
            <TableCell>{player.userName}</TableCell>
            <TableCell>{calculateStatistics(player._id).gamesPlayed}</TableCell>
            <TableCell>{calculateStatistics(player._id).gamesWon}</TableCell>
            <TableCell>{calculateStatistics(player._id).gamesLost}</TableCell>
            <TableCell>
              {calculateStatistics(player._id).gamesLost === 0
                ? "N/A"
                : calculateStatistics(player._id).gamesWon /
                  calculateStatistics(player._id).gamesLost}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default StatsTable;
