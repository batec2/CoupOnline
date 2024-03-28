import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useRef, useState } from "react";
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
  const [cookieExists, setCookieExists] = useState(true);

  // Checks if a cookie exists for a user, if not, logs then out
  useEffect(() => {
    if (cookies.get("PersonalCookie") === undefined) {
      setCookieExists(false); // Update state when cookie doesn't exist
    }
  }, []);

  const handleJoin = () => {
    if (!room.current) {
      return;
    }
    navigate(`${room.current}`);
  };

  const handleLogout = () => {
    cookies.remove("PersonalCookie");
    navigate("/");
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleJoin();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {!cookieExists && (
        <div>
          <p className="text-textColor-error mb-4">
            Please log in to create a game.
          </p>
        </div>
      )}
      <div className="w-50">
        <div className="mb-4">
          <Input
            type="text"
            onChange={(e) => {
              room.current = e.target.value;
            }}
            onKeyPress={handleKeyPress}
            placeholder="Room Number"
            disabled={room.current ? true : false}
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>
        {cookieExists && (
          <Button
            onClick={handleJoin}
            className="bg-button-mainButton text-white px-4 py-2 rounded-md w-full"
            disabled={!cookieExists}
          >
            {room.current ? "Leave Room" : "Join Room"}
          </Button>
        )}
        {cookieExists && (
          <Button
            onClick={handleLogout}
            className="bg-button-redButton text-white px-4 py-2 my-4 rounded-md w-full"
            disabled={!cookieExists}
          >
            Logout
          </Button>
        )}
        {!cookieExists && (
          <Button
            onClick={() => navigate("/")}
            className="bg-button-mainButton text-white rounded-md w-full"
          >
            Login
          </Button>
        )}
      </div>
    </div>
  );
};

export default RoomPage;
