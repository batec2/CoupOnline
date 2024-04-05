import { terminal } from "virtual:terminal";
import axios from "axios";

const verifyAccount = async (username, setVerified) => {
  try {
    const response = await axios
      .get(`${import.meta.env.VITE_SERVER_URL}/players/byName/${username}`)
      .catch(() => {
        return false;
      });
    if (response.status === 200) {
      return true;
    }
  } catch (e) {
    return false;
  }
  return false;
};

export default verifyAccount;
