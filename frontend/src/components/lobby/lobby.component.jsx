import { useContext } from "react";
import { Button } from "../ui/button";
import { GameStateContext } from "@/context/GameStateContext";
import { handleLeave, handleStartGame } from "@/actions/socketActions";
import { useNavigate } from "react-router-dom";

const LobbyComponent = () => {
  const { socket, roomId, currentLobbyMembers } = useContext(GameStateContext);
  const navigate = useNavigate();

  const playerIds = currentLobbyMembers ? Object.keys(currentLobbyMembers) : [];
  return (
    <div className="space-x-2">
      <h1>Your Current Room: {roomId}</h1>
      <Button
        onClick={() => {
          handleLeave(socket, roomId);
          navigate("/room");
        }}
      >
        Leave Room
      </Button>
      <Button onClick={() => handleStartGame(socket, roomId)}>
        Start Game
      </Button>
      <div>
        <p className="text-xl font-bold">Players in Lobby:</p>
        {playerIds.map((player) => (
          <p key={currentLobbyMembers[player].userId}>
            {currentLobbyMembers[player].userId}
          </p>
        ))}
      </div>
    </div>
  );
};

export default LobbyComponent;
