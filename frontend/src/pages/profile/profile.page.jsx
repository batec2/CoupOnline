import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [games, setGames] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const cookies = new Cookies();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const cookie = cookies.get("PersonalCookie");
        if (!cookie) {
          // redirect to login page if user is not logged in
          setErrorMessage(
            "Please login first ... you are being redirected to the login page"
          );
          setTimeout(() => {
            setErrorMessage(null);
            navigate("/");
          }, 1500);
          return;
        }

        const playersResponse = await axios.get(
          `http://localhost:8080/players/${cookie.id}`
        );
        const gamesResponse = await axios.get(`http://localhost:8080/games`);
        setUser(playersResponse.data);
        setGames(gamesResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchUserData();
  }, []);

  if (errorMessage) {
    return <div className="text-center">{errorMessage}</div>;
  }

  if (user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Profile Page</h1>
        <p className="mb-2">
          <span className="font-semibold">User Name:</span> {user.userName}
        </p>
        <p className="mb-2">
          <span className="font-semibold">Screen Name:</span> {user.screenName}
        </p>
        <p className="mb-2">
          <span className="font-semibold">Email:</span> {user.email}
        </p>

        <h2 className="text-2xl font-semibold mb-4">Game History</h2>
        <p className="mb-2">
          <span className="font-semibold">Games Won:</span> {user.gamesWon}
        </p>
        <p className="mb-2">
          <span className="font-semibold">Games Lost:</span> {user.gamesLost}
        </p>
        <p className="mb-2">
          <span className="font-semibold">Win Streak:</span> {user.winStreak}
        </p>
      </div>
    );
  }
};

export default ProfilePage;
