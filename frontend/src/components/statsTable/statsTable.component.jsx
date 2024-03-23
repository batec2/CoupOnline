import React from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  Button,
} from "semantic-ui-react";
import "./statsTable.component.css";

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
    <div>
      <Table className="StatsTable">
        <TableHeader>
          <TableRow>
            <Table.HeaderCell className="statsTableHeaderCell">
              Username
            </Table.HeaderCell>
            <Table.HeaderCell className="statsTableHeaderCell">
              Games Played
            </Table.HeaderCell>
            <Table.HeaderCell className="statsTableHeaderCell">
              Games Won
            </Table.HeaderCell>
            <Table.HeaderCell className="statsTableHeaderCell">
              Games Lost
            </Table.HeaderCell>
            <Table.HeaderCell className="statsTableHeaderCell">
              Win Lose Ratio
            </Table.HeaderCell>
            <Table.HeaderCell className="statsTableHeaderCell">
              Check Games
            </Table.HeaderCell>
          </TableRow>
        </TableHeader>

        <TableBody>
          {players.map((player, index) => (
            <TableRow key={index}>
              <TableCell>{player.userName}</TableCell>
              <TableCell>
                {calculateStatistics(player._id).gamesPlayed}
              </TableCell>
              <TableCell>{calculateStatistics(player._id).gamesWon}</TableCell>
              <TableCell>{calculateStatistics(player._id).gamesLost}</TableCell>
              <TableCell>
                {calculateStatistics(player._id).gamesLost === 0
                  ? "N/A"
                  : calculateStatistics(player._id).gamesWon /
                    calculateStatistics(player._id).gamesLost}
              </TableCell>
              <TableCell>
                <Button>Stats</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default StatsTable;
