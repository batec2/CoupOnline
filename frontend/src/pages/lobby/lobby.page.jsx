import "./lobby.styles.css";
import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SocketContext from "../../context/socketContext";

const LobbyPage = () => {
  const { roomId } = useParams();
  const socket = useContext(SocketContext);
  const navigate = useNavigate();

  const handleStatus = ({ status }) => {
    if (!status) {
      console.log("Error: No status received");
      return;
    }
    console.log(status);
  };

  const handleLeave = () => {
    socket.emit("leave-room", { roomId: roomId }, handleStatus);
    navigate("/room");
  };

  useEffect(() => {
    socket.emit("join-room", { roomId: roomId }, handleStatus);
  }, [roomId, socket]);

  return (
    <div>
      <h1>Your Current Room: {roomId}</h1>
      <button onClick={() => handleLeave()}>Leave Room</button>
    </div>
  );
};

export default LobbyPage;
