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

  // Function to handle joining a room
  const handleJoin = () => {
    if (!room.current) {
      return;
    }
    navigate(`${room.current}`);
  };

  // Function to handle user logout
  const handleLogout = () => {
    cookies.remove("PersonalCookie");
    navigate("/");
  };

  // Function to handle 'enter' key press for joining room
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleJoin();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {/* Display message if not logged in  */}
      {!cookieExists && (
        <div>
          <p className="text-textColor-error mb-4">
            Please log in to join a game.
          </p>
        </div>
      )}
      <div className="w-50">
        <div className="mb-4">
          {cookieExists && (
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
          )}
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
        {/* Button to navigate to login page if not logged in  */}
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
