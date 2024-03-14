import { Button } from "../ui/button";
const LobbyComponent = ({
  roomId,
  handleLeave,
  handleStart,
  currentLobbyMembers,
}) => {
  return (
    <div>
      <h1>Your Current Room: {roomId}</h1>
      <Button onClick={() => handleLeave()}>Leave Room</Button>
      <Button onClick={() => handleStart()}>Start Game</Button>
      <div>
        <p>{currentLobbyMembers ? JSON.stringify(currentLobbyMembers) : ""}</p>
      </div>
    </div>
  );
};

export default LobbyComponent;
