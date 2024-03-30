import axios from "axios";

const retrieveAccountByName = async (username) => {
  const response = await axios.get(
    `http://localhost:8080/players/byName/${username}`
  );
  if (response.status === 200) {
    return response;
  } else {
    return undefined;
  }
};

export default retrieveAccountByName;
