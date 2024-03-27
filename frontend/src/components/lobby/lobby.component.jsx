import { useContext } from "react";
import { Button } from "../ui/button";
import { GameStateContext } from "@/context/GameStateContext";
import { handleLeave, handleStartGame } from "@/components/game/socketActions";
import { useNavigate } from "react-router-dom";

const LobbyComponent = () => {
  const { socket, roomId, currentLobbyMembers } = useContext(GameStateContext);
  const navigate = useNavigate();

  const playerIds = currentLobbyMembers ? Object.keys(currentLobbyMembers) : [];

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="w-50">
        <h1 className="mb-4 text-center">Your Current Room: {roomId}</h1>
        <Button
          className="bg-blue-800 text-white px-4 py-2 rounded-md mb-2 w-full"
          onClick={() => handleStartGame(socket, roomId)}
        >
          Start Game
        </Button>
        <Button
          className="bg-blue-400 text-white px-4 py-2 rounded-md mb-2 w-full"
          onClick={() => {
            handleLeave(socket, roomId);
            navigate("/room");
          }}
        >
          Leave Room
        </Button>
        <div className="text-center">
          <p className="text-xl font-bold mb-2">Players in Lobby:</p>
          {playerIds.map((player) => (
            <p key={currentLobbyMembers[player].userId}>
              {currentLobbyMembers[player].userId}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LobbyComponent;
