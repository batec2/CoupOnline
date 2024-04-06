import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import calculatePlayerStatistics from "@/components/statsTable/calculatePlayerStatistics";

const API_URL = import.meta.env.VITE_SERVER_URL;
const PLAYER_ENDPOINT = "/players/";
const GAMES_ENDPOINT = "/games/";

const ProfilePage = () => {
  // State to manage user data and error messages
  const [userData, setUserData] = useState({
    user: null,
    userGames: null,
    errorMessage: null,
  });
  const cookies = new Cookies();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Check if user is logged in
        const cookie = cookies.get("PersonalCookie");
        // Redirect to login if not
        if (!cookie) {
          setUserData((prevState) => ({
            ...prevState,
            errorMessage:
              "Please login first ... you are being redirected to the login page",
          }));
          setTimeout(() => {
            navigate("/");
          }, 1500);
          return;
        }

        const playersResponse = await axios.get(
          `${API_URL}${PLAYER_ENDPOINT}${cookie.id}`
        );
        const userGames = await axios.get(`${API_URL}${GAMES_ENDPOINT}`);
        setUserData({
          user: playersResponse.data,
          userGames: userGames.data,
          errorMessage: null,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
        setUserData((prevState) => ({
          ...prevState,
          errorMessage: "Error fetching user data. Please try again later.",
        }));
      }
    };

    fetchUserData();
  }, []);

  const { user, userGames, errorMessage } = userData;

  // Render error message if any
  if (errorMessage) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-textColor-error mb-4 text-center">
          {errorMessage}
        </div>
      </div>
    );
  }

  if (user) {
    // Calculate player statistics
    console.log(user.games);
    const playerStatistics = calculatePlayerStatistics({
      players: [user],
      games: userGames,
    });

    return (
      <Card className="w-[380px] mx-auto mt-8">
        <CardHeader>
          <CardTitle>
            Welcome,{" "}
            {user &&
              user.userName &&
              user.userName.charAt(0).toUpperCase() + user.userName.slice(1)}
            !
          </CardTitle>{" "}
        </CardHeader>
        <CardContent>
          <CardDescription>
            <span className="font-semibold">User Name:</span> {user.userName}
          </CardDescription>
          <CardDescription>
            <span className="font-semibold">Screen Name:</span>{" "}
            {user.screenName}
          </CardDescription>
          <CardDescription>
            <span className="font-semibold">Email:</span> {user.email}
          </CardDescription>
          {playerStatistics.map((stats, index) => (
            <div key={index}>
              <CardDescription>
                <span className="font-semibold">Games Played:</span>{" "}
                {stats.gamesPlayed}
              </CardDescription>
              <CardDescription>
                <span className="font-semibold">Games Won:</span>{" "}
                {stats.gamesWon}
              </CardDescription>
              <CardDescription>
                <span className="font-semibold">Games Lost:</span>{" "}
                {stats.gamesLost}
              </CardDescription>
              <CardDescription>
                <span className="font-semibold">Win Loss Ratio:</span>{" "}
                {stats.gamesLost !== 0
                  ? (stats.gamesWon / stats.gamesLost).toFixed(2)
                  : "N/A"}
              </CardDescription>
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }
  return null;
};

export default ProfilePage;
