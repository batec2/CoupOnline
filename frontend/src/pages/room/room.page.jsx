import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
        <Input
          type="text"
          onChange={(e) => {
            room.current = e.target.value;
          }}
          placeholder="Room Number"
          disabled={room.current ? true : false}
          className="w-200"
        ></Input>
      </div>
      <Button onClick={handleJoin}>
        {room.current ? "Leave Room" : "Join Room"}
      </Button>
    </div>
  );
};

export default RoomPage;
