import { useContext, useState } from "react";
import SocketContext from "../../context/socketContext";

/**
 * Page for joining a game Room
 * @returns
 */
const RoomPage = () => {
  const [currentRoom, setRoom] = useState("");
  const socket = useContext(SocketContext);
  const handleJoin = () => {
    socket.emit("join-room", { roomName: currentRoom });
  };

  return (
    <div>
      <input
        type="text"
        onChange={(e) => {
          console.log(e.target.value);
          setRoom(e.target.value);
        }}
        placeholder="Room Number"
      ></input>
      <button onClick={() => handleJoin()}>Join</button>
    </div>
  );
};

export default RoomPage;
