import {Table, TableHeader, TableHeaderCell, TableBody, TableRow, TableCell, Button} from "semantic-ui-react";
import {useState} from "react";
import "./statsTable.component.css"
const StatsTable = (entries) => {
  const [LocalEntries, setLocalEntries] = useState(entries)
  return (
    <div>
      <Table className="StatsTable">
        <TableHeader>
          <TableHeaderCell className="statsTableHeaderCell">Username</TableHeaderCell>
          <TableHeaderCell className="statsTableHeaderCell">Games Played</TableHeaderCell>
          <TableHeaderCell className="statsTableHeaderCell">Games Won</TableHeaderCell>
          <TableHeaderCell className="statsTableHeaderCell">Games Lost</TableHeaderCell>
          <TableHeaderCell className="statsTableHeaderCell">Win Lose Ratio</TableHeaderCell>
          <TableHeaderCell className="statsTableHeaderCell">Check Games</TableHeaderCell>
        </TableHeader>
        <TableBody>
          {LocalEntries.entries.map((entry, index) => {
            return (
              <TableRow key={index}>
                <TableCell>{entry.userName}</TableCell>
                <TableCell>{entry.games.length}</TableCell>
                <TableCell>TBD</TableCell>
                <TableCell>TBD</TableCell>
                <TableCell>TBD</TableCell>
                <TableCell>
                  <Button>Stats</Button>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}





export default StatsTable;