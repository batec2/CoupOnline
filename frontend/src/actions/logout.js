import axios from "axios";

const logoutCall = async () => {
  const response = await axios.get(
    `http://localhost:8080/loginLogout/logout/`
  ,{ withCredentials: true });
  if (response.status === 200) {
    return response;
  } else {
    return undefined;
  }
};

export default logoutCall;