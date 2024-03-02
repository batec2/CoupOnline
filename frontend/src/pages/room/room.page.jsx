import { useState } from "react";
import { io } from "socket.io-client";

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
      <input
        type="text"
        onChange={(e) => setRoom(e)}
        placeholder="Room Number"
      ></input>
      <button onClick={() => handleJoin()}>Join</button>
    </div>
  );
};

export default RoomPage;
