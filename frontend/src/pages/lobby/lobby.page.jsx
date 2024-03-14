import "./lobby.styles.css";
import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SocketContext from "../../context/socketContext";
import { handleStartGame } from "@/actions/socketActions";
import LobbyComponent from "@/components/lobby/lobby.component";
import GameComponent from "@/components/game/game.component";

const LobbyPage = () => {
  const { roomId } = useParams();
  const socket = useContext(SocketContext);
  const [currentLobbyMembers, setLobbyMembers] = useState(null);
  const [gameStart, setGameStart] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    socket.emit("join-room", { roomId: roomId, userId: "user1" }, handleStatus);
  }, [roomId, socket]);

  socket.on("lobby-members", ({ lobby }) => {
    setLobbyMembers(lobby);
  });

  socket.on("start-game", () => {
    setGameStart(true);
    console.log("start-game");
  });

  const handleStatus = ({ status }) => {
    if (!status) {
      console.log("Error: No status received");
      return;
    }
    console.log(status);
  };

  const handleLeave = () => {
    socket.emit(
      "leave-room",
      { roomId: roomId, userId: "user1" },
      handleStatus
    );
    navigate("/room");
  };

  const handleStart = () => {
    handleStartGame(socket, roomId);
  };

  const handleUi = () => {
    if (gameStart) {
      return <GameComponent socket={socket}></GameComponent>;
    }
    return (
      <LobbyComponent
        roomId={roomId}
        handleLeave={handleLeave}
        handleStart={handleStart}
        currentLobbyMembers={currentLobbyMembers}
      ></LobbyComponent>
    );
  };

  return handleUi();
};

export default LobbyPage;
