import axios from "axios";

const logoutCall = async () => {
  const response = await axios.get(
    `${import.meta.env.VITE_SERVER_URL}/loginLogout/logout/`,
    { withCredentials: true }
  );
  if (response.status === 200) {
    return response;
  } else {
    return undefined;
  }
};

export default logoutCall;
