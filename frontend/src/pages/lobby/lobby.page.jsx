import "./lobby.styles.css";
import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SocketContext from "../../context/socketContext";
import { Button } from "@/components/ui/button";
import { handleStartGame } from "@/actions/socketActions";

const LobbyPage = () => {
  const { roomId } = useParams();
  const socket = useContext(SocketContext);
  const [currentLobbyMembers, setLobbyMembers] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    socket.emit("join-room", { roomId: roomId, userId: "user1" }, handleStatus);
  }, [roomId, socket]);

  socket.on("lobby-members", ({ lobby }) => {
    setLobbyMembers(lobby);
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

export default LobbyPage;
