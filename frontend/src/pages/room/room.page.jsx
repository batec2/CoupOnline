import { useState } from "react";
import { io } from "socket.io-client";
import TextField from "../../components/textfield/textfield.component";

/**
 * Page for joining a game Room
 * @returns
 */
const RoomPage = () => {
  const [currentRoom, setRoom] = useState("");
  const socket = io("http://localhost:8080");
  const handleJoin = () => {
    socket.emit("join-room", currentRoom);
  };
  return (
    <div>
      <TextField
        onChange={(e) => setRoom(e)}
        placeholder="Room Number"
      />
      <button onClick={() => handleJoin()}>Join</button>
    </div>
  );
};

export default RoomPage;
