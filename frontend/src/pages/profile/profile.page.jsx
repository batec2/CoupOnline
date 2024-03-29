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

const API_URL = "http://localhost:8080";
const PLAYER_ENDPOINT = "/players/";
const GAMES_ENDPOINT = "/games/";

const ProfilePage = () => {
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
        const cookie = cookies.get("PersonalCookie");
        if (!cookie) {
          setUserData((prevState) => ({
            ...prevState,
            errorMessage:
              "Please login first ... you are being redirected to the login page",
          }));
          setTimeout(() => {
            setUserData((prevState) => ({
              ...prevState,
              errorMessage: null,
            }));
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

  if (errorMessage) {
    return <div className="text-center">{errorMessage}</div>;
  }

  if (user) {
    // render user profile
    console.log(user.games);
    const playerStatistics = calculatePlayerStatistics({
      players: [user],
      games: userGames,
    });

    return (
      <Card className="w-[380px] mx-auto">
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
