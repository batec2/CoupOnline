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
const StatsPage = () => {
  const queryClient = useQueryClient();
  const [AllPlayers, setAllPlayers] = useState([]);

  const {
    data: results,
    isError,
    isPending,
  } = useQuery({
    queryKey: ["players"],
    queryFn: async () => {
      const response = await axiosClientPlayers.get("/players");
      if (response.status != 200) {
        throw new Error(`Failed to get players`);
      }
      console.log(response.data);
      return response.data;
    },
  });

  console.log(results);
  if (isError) {
    return (
      <div>
        <h1>🤷‍♂️UHOH HOT DOG🌭</h1>
      </div>
    );
  } else if (isPending) {
    return (
      <div>
        <h1>🤷‍♂️UHOH WE LOADING🌭</h1>
      </div>
    );
  }
  return (
    <div>
      <p>{JSON.stringify(results)}</p>
    </div>
  );

  // return (
  //   <div>
  //     {/* {isSuccess && <StatsTable entries={AllPlayers}></StatsTable>} */}
  //     {isError && <h3>Error Occurred In Retrieving Player Stats</h3>}
  //   </div>
  // );
};

export default StatsPage;
