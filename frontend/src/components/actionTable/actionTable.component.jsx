import actions from "../../data/actions.json";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

/**
 * Table showing all available player actions
 * @returns ActionTable table react component
 */
const ActionTable = () => {
  return (
    <Table>
      <TableCaption>Actions</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Card</TableHead>
          <TableHead>Action</TableHead>
          <TableHead>Effect</TableHead>
          <TableHead>Counteraction</TableHead>
        </TableRow>
      </TableHeader>
      {actions.map((action) => (
        <TableBody>
          <TableRow>
            <TableCell>
              {action["character"] == "" ? "-" : action["character"]}
            </TableCell>
            <TableCell>
              {action["action-name"] == "" ? "-" : action["action-name"]}
            </TableCell>
            <TableCell>
              {action["action-effect"] == "" ? "-" : action["action-effect"]}
            </TableCell>
            <TableCell>
             {action["counteraction"] == "" ? "-" : action["counteraction"]}
            </TableCell>
          </TableRow>
        </TableBody>
      ))}
    </Table>
  );
};

export default ActionTable;
