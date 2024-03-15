import "./lobby.styles.css";
import { useContext, useEffect, useState } from "react";
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
  const [currentTurnId, setTurnId] = useState(null);
  const [gameCards, setGameCards] = useState(null);
  const [responseAction, setResponseAction] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    socket.emit("join-room", { roomId: roomId, userId: "user1" }, handleStatus);
  }, [roomId, socket]);

  socket.on("lobby-members", ({ lobby }) => {
    setLobbyMembers(lobby);
  });

  socket.on("game-cards", ({ cards }) => {
    console.log(cards);
    setGameCards(cards);
  });

  socket.on("start-game", ({ turnId }) => {
    setGameStart(true);
    setTurnId(turnId);
  });

  socket.on("player-choice", ({ responseAction }) => {
    setResponseAction(responseAction);
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

  const handleUi = (turnId, roomId) => {
    console.log(turnId);
    if (gameStart) {
      return (
        <GameComponent
          socket={socket}
          turnId={turnId}
          roomId={roomId}
          cards={gameCards}
          responseAction={responseAction}
        ></GameComponent>
      );
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

  return handleUi(currentTurnId, roomId);
};

export default LobbyPage;
