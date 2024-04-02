import axios from "axios";

const loginCall = async (username) => {

  const response = await axios.get(
    `http://localhost:8080/loginLogout/login/${username}`
  , { withCredentials: true });

  console.log(response)
  if (response.status === 200) {
    return response;
  } else {
    return undefined;
  }
};

export default loginCall;
