import actions from "../../data/actions.json";

import "./actionTable.styles.css";

/**
 * Table showing all available player actions
 * @returns ActionTable table react component
 */
const ActionTable = () => {
  return (
    <table className="tableActions">
      <tr>
        <th className="tableActionsElement">Card</th>
        <th className="tableActionsElement">Action</th>
        <th className="tableActionsElement">Effect</th>
        <th className="tableActionsElement">Counteraction</th>
      </tr>
      {actions.map((action) => (
        <tr>
          <td className="tableActionsElement">
            {action["character"] == "" ? "-" : action["character"]}
          </td>
          <td className="tableActionsElement">
            {action["action-name"] == "" ? "-" : action["action-name"]}
          </td>
          <td className="tableActionsElement">
            {action["action-effect"] == "" ? "-" : action["action-effect"]}
          </td>
          <td className="tableActionsElement">
            {action["counteraction"] == "" ? "-" : action["counteraction"]}
          </td>
        </tr>
      ))}
    </table>
  );
};

export default ActionTable;
