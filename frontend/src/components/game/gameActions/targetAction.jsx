import { Button } from "@/components/ui/button";
import useGameContext from "@/context/useGameContext";

const TargetAction = ({ showTarget }) => {
  const { currentLobbyMembers } = useGameContext();
  const buttons = [];
  Object.keys(currentLobbyMembers).forEach((member) => {
    buttons.push(<Button key={member}>{member}</Button>);
  });

  return showTarget ? (
    <div>
      <h2>Targets</h2>
      {buttons}
    </div>
  ) : (
    <></>
  );
};

export default TargetAction;
