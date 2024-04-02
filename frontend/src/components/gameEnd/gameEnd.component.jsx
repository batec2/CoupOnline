import useGameContext from "@/context/useGameContext";
import { Button } from "../ui/button";
import {
  handleLeave,
  handleReturnLobby,
} from "@/components/game/socketActions";
import { useNavigate } from "react-router-dom";
import { terminal } from "virtual:terminal";
import { useRef } from "react";
import usePlayerState from "../game/PlayerState";

/**
 * Generates React element for the game over screen
 * @returns GameEnd react UI element
 */
const GameEnd = () => {
  const { winner, socket, roomId } = useGameContext();
  const { setInLobby } = usePlayerState();
  const navigate = useNavigate();
  const room = useRef();

  const gameEndMessage = () => {
    if (socket.current.id === winner) {
      return <h1 className="w-full text-center">YOU WIN</h1>;
    } else {
      return <h1>Someone else won you are loser!</h1>;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="w-50">
        {gameEndMessage()}
        <Button
          className="bg-button-mainButton text-white px-4 py-2 rounded-md w-full"
          onClick={() => {  
            setInLobby(true);
            handleReturnLobby();
            navigate(`/room/${roomId}`);
            terminal.log(`/room/${roomId}`);
          }}
        >
          Return to Lobby
        </Button>
        <Button
          className="bg-button-redButton text-white px-4 my-4 rounded-md w-full"
          onClick={() => {
            handleLeave(socket.current, roomId);
            navigate("/room");
          }}
        >
          Leave Room
        </Button>
      </div>
    </div>
  );
};

export default GameEnd;
