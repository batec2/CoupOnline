import useGameContext from "@/context/useGameContext";
import { Button } from "../ui/button";
import { handleLeave, handleReturnLobby } from "@/components/game/socketActions";
import { useNavigate } from "react-router-dom";
import { terminal } from "virtual:terminal"
import { useRef } from "react";

const Winner = () => {
  const { winner, socket, roomId } = useGameContext();
  const navigate = useNavigate();
  const room = useRef();

  const gameEndMessage = () => {
    if (socket.id === winner) {
      return (
        <h1>YOU WIN</h1>
      );
    } else {
      return (
        <h1>Someone else won you are loser!</h1>
      );
    }
  }

  return (
    <div>
      {gameEndMessage()}
      <Button
        onClick={() => {
          handleLeave(socket, roomId);
          navigate("/room");
        }}
      >
        Leave Room
      </Button>
      <Button
        onClick={() => {
          handleReturnLobby();
          navigate(`/room/${roomId}`)
          terminal.log(`/room/${roomId}`)
        }}
      >
        Return to Lobby
      </Button>
    </div>
  );
};

export default Winner;
