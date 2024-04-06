import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import axios from "axios";
import StatsTable from "../../components/statsTable/statsTable.component.jsx";
import calculatePlayerStatistics from "@/components/statsTable/calculatePlayerStatistics.js";

const axiosClientPlayers = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/x-www-form-urlencoded",
  },
});

const axiosClientGames = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/x-www-form-urlencoded",
  },
});

const StatsPage = () => {
  const queryClient = useQueryClient();
  const [allPlayers, setAllPlayers] = useState([]);

  const {
    data: playersData,
    isError: playersError,
    isPending: playersPending,
  } = useQuery({
    queryKey: ["players"],
    queryFn: async () => {
      const response = await axiosClientPlayers.get("/players");
      if (response.status != 200) {
        throw new Error(`Failed to get players`);
      }
      return response.data;
    },
  });

  const {
    data: gamesData,
    isError: gamesError,
    isPending: gamesPending,
  } = useQuery({
    queryKey: ["games"],
    queryFn: async () => {
      const response = await axiosClientGames.get("/games");
      if (response.status !== 200) {
        throw new Error(`Failed to get games`);
      }
      return response.data;
    },
  });

  // If there are errors fetching data
  if (playersError || gamesError) {
    return (
      <div>
        <h1>Unable to retrieve stats. Error: {playersError || gamesError}</h1>
      </div>
    );
    // If data is still pending
  } else if (playersPending || gamesPending) {
    return (
      <div className="text-center">
        <h1>Crunching the latest statistics ...</h1>
      </div>
    );
    // If data is fetched successfully
  } else {
    const playerStatistics = calculatePlayerStatistics({
      players: playersData,
      games: gamesData,
    });
    return (
      <div className="m-16 mt-4 w-50">
        <StatsTable playerStatistics={playerStatistics} players={playersData} />
      </div>
    );
  }
};

export default StatsPage;
