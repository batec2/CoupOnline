import axios from "axios";
const getPlayers = async () => {
  const response = await axios.get("http://localhost:8080/players");
  if (response.status != 200) {
    throw new Error(`Failed to get players`);
  }
  return response.data;
};
export default getPlayers;
