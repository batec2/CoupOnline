import { useContext, useEffect, useRef, useState } from "react";
import SocketContext from "../../context/socketContext";

/**
 * Page for joining a game Room
 * @returns
 */
const RoomPage = () => {
  // const [currentRoom, setRoom] = useState("");
  let room = useRef(null);
  const [currentDisplay, setDisplay] = useState("");
  const socket = useContext(SocketContext);

  useEffect(() => {
    room.current = localStorage.getItem("room_id");
    setDisplay(room.current);
  }, []);

  const handleClick = () => {
    console.log(room.current);
    if (!currentDisplay) {
      socket.emit(
        //event name
        "join-room",
        //room id
        { roomName: room.current },
        //callback to get status
        (response) => {
          if (response.status === 200) {
            localStorage.setItem("room_id", room.current);
            setDisplay(room.current);
          } else {
            alert("failed to join room");
          }
        }
      );
    } else {
      socket.emit("leave-room", { roomName: room.current }, (response) => {
        if (response.status === 200) {
          localStorage.removeItem("room_id");
          room.current = null;
          setDisplay();
        } else {
          alert("failed to leave room");
        }
      });
    }
  };

  return (
    <div>
      <h1>
        {currentDisplay ? `Current Room Id: ${currentDisplay}` : "Join a Room"}
      </h1>
      <div>
        <input
          type="text"
          onChange={(e) => {
            // console.log(e.target.value);
            room.current = e.target.value;
          }}
          placeholder="Room Number"
          disabled={room.current ? true : false}
        ></input>
      </div>
      <button onClick={() => handleClick()}>
        {currentDisplay ? "Leave Room" : "Join Room"}
      </button>
    </div>
  );
};

export default RoomPage;
