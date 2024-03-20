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
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="mb-4">
        <Input
          type="text"
          onChange={(e) => {
            room.current = e.target.value;
          }}
          placeholder="Room Number"
          disabled={room.current ? true : false}
          className="w-64 px-4 py-2 border rounded-md"
        />
      </div>
      <Button
        onClick={handleJoin}
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        {room.current ? "Leave Room" : "Join Room"}
      </Button>
    </div>
  );
};

export default RoomPage;
