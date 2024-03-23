import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import axios from "axios";
import StatsTable from "../../components/statsTable/statsTable.component.jsx";

const axiosClientPlayers = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/x-www-form-urlencoded",
    "Access-Control-Allow-Origin": "*",
  },
});

/**
 * Page for getting the global stats, for example
 * win-rate per card, most winning card combinations, ect..
 * @returns Stats/Leader Board
 */
const axiosClientGames = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/x-www-form-urlencoded",
    "Access-Control-Allow-Origin": "*",
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

  if (playersError || gamesError) {
    return (
      <div>
        <h1>Unable to retrieve stats. Error: {playersError || gamesError}</h1>
      </div>
    );
  } else if (playersPending || gamesPending) {
    return (
      <div className="text-center">
        <h1>Crunching the latest statistics ...</h1>
      </div>
    );
  } else {
    return (
      <div className="m-16 mt-4">
        <StatsTable players={playersData} games={gamesData} />
      </div>
    );
  }
};

export default StatsPage;
