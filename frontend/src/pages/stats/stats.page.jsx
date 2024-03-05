import {useQuery, useQueryClient} from "@tanstack/react-query";
import {useState} from "react";
import axios from "axios";
import StatsTable from "../../components/statsTable/statsTable.component.jsx";


const axiosClientPlayers = axios.create({
    baseURL: "http://localhost:8080",
    headers: {
            Accept: "application/json",
            "Content-Type": "application/x-www-form-urlencoded",
            "Access-Control-Allow-Origin": "*"}
})

/**
 * Page for getting the global stats, for example
 * win-rate per card, most winning card combinations, ect..
 * @returns Stats/Leader Board
 */
const StatsPage = () => {

  const queryClient = useQueryClient()
  const [AllPlayers, setAllPlayers] = useState([])

  const {
    data: results,
    isError,
    isSuccess
  } = useQuery({
                queryKey: ["players"],
                queryFn: () => {axiosClientPlayers.get('/players').then((res) => {
                  console.log(res.data)
                  return res.data
                  })}})

  console.log(results)


  return (
    <div>
      {isSuccess &&
        <StatsTable entries={AllPlayers}></StatsTable>
      }
      {
       isError &&
       <h3>Error Occurred In Retrieving Player Stats</h3>
      }
    </div>
  );
};

export default StatsPage;
