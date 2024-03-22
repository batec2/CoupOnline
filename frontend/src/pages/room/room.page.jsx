import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {useEffect, useRef, useState} from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

const cookies = new Cookies();

/**
 * Page for joining a game Room
 * @returns
 */
const RoomPage = () => {
  const room = useRef();
  const navigate = useNavigate();

  // Checks if a cookie exists for a user, if not, logs then out
  useEffect(() => {
    if(cookies.get("PersonalCookie") === undefined){
      navigate("/")
    }
  }, []);
  const handleJoin = () => {
    if (!room.current) {
      return;
    }
    navigate(`${room.current}`);
  };

  const handleLogout = () => {
    cookies.remove("PersonalCookie")
    navigate("/");
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
      <Button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 my-4 rounded-md"
      >
        {"Logout"}
      </Button>
    </div>
  );
};

export default RoomPage;
