import axios from "axios";

const loginCall = async (username) => {

  const response = await axios.get(
    `http://localhost:8080/players/login/${username}`
  );
  if (response.status === 200) {
    return response;
  } else {
    return undefined;
  }
};

export default loginCall;
