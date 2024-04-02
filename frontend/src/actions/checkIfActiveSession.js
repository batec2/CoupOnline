import axios from "axios";

const checkIfLoggedInCall = async () => {
  const response = await axios.get(
    `http://localhost:8080/loginLogout/checkLogin/`
  ,{ withCredentials: true });
  if (response.status === 200) {
    return response;
  } else {
    return undefined;
  }
};

export default checkIfLoggedInCall;