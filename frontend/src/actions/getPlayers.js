import axios from "axios";
const getPlayers = async () => {
  const response = await axios.get(`import.meta.env.VITE_SERVER_URL/players`);
  if (response.status != 200) {
    throw new Error(`Failed to get players`);
  }
  return response.data;
};
export default getPlayers;
