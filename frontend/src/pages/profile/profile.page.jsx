/**
 * Page for seeing users profile and game history
 * @returns Profile Page
 */
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [games, setGames] = useState(null);
  const cookies = new Cookies();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const cookie = cookies.get("PersonalCookie");
        const playersResponse = await axios.get(
          `http://localhost:8080/players/${cookie}`
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

  if (!user || !games) {
    return <div>Loading profile...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Profile Page</h1>
      <p className="mb-2">User Name: {user.userName}</p>
      <p className="mb-2">Screen Name: {user.screenName}</p>
      <p className="mb-2">Email: {user.email}</p>

      <h2 className="text-2xl font-semibold mb-4">Game History</h2>
      <p className="mb-2">Games Won: {user.gamesWon}</p>
      <p className="mb-2">Games Lost: {user.gamesLost}</p>
      <p className="mb-2">Win Streak: {user.winStreak}</p>
    </div>
  );
};

export default ProfilePage;
