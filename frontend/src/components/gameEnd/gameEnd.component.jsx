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
  const { winner, socket, roomId, cookieRef } = useGameContext();
  const { setInLobby } = usePlayerState();
  const navigate = useNavigate();
  const room = useRef();
  const { id } = cookieRef.current;
  const gameEndMessage = () => {
    if (id === winner) {
      return (
        <div className="w-full text-center mb-4">
          <h1>You are the </h1>
          <h1 className="text-4xl">SUPER COUPER!!!</h1>
        </div>
      );
    } else {
      return (
        <div className="w-full text-center mb-4">
          <h1>You have lost the game</h1>
          <h1>Better luck next time!</h1>
        </div>
      );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="w-50">
        {gameEndMessage()}
        {/* <Button
          className="bg-button-mainButton text-white px-4 py-2 rounded-md w-full"
          onClick={() => {
            setInLobby(true);
            handleReturnLobby();
            navigate(`/room/${roomId}`);
            terminal.log(`/room/${roomId}`);
          }}
        >
          Return to Lobby
        </Button> */}
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
