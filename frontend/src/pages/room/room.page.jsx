import { Button } from "@/components/ui/button";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

/**
 * Page for joining a game Room
 * @returns
 */
const RoomPage = () => {
  const room = useRef();
  const navigate = useNavigate();

  const handleJoin = () => {
    if (!room.current) {
      return;
    }
    navigate(`${room.current}`);
  };

  return (
    <div>
      <div>
        <input
          type="text"
          onChange={(e) => {
            room.current = e.target.value;
          }}
          placeholder="Room Number"
          disabled={room.current ? true : false}
        ></input>
      </div>
      <Button onClick={handleJoin}>
        {room.current ? "Leave Room" : "Join Room"}
      </Button>
    </div>
  );
};

export default RoomPage;
