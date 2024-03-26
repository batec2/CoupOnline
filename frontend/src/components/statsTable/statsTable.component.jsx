import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const StatsTable = ({ playerStatistics, players }) => {
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
              {stats.gamesLost !== 0
                ? (stats.gamesWon / stats.gamesLost).toFixed(2)
                : "N/A"}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default StatsTable;
