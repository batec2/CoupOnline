import { useContext } from "react";
import { Button } from "../ui/button";
import { GameStateContext } from "@/context/GameStateContext";
import { handleLeave, handleStartGame } from "@/actions/socketActions";
import { useNavigate } from "react-router-dom";

const LobbyComponent = () => {
  const { socket, roomId, currentLobbyMembers } = useContext(GameStateContext);
  const navigate = useNavigate();
  return (
    <div>
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
        <p>{currentLobbyMembers ? JSON.stringify(currentLobbyMembers) : ""}</p>
      </div>
    </div>
  );
};

export default LobbyComponent;
