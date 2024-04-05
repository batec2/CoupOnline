import axios from "axios";

const loginCall = async (username) => {
  const response = await axios.get(
    `${import.meta.env.VITE_SERVER_URL}/loginLogout/login/${username}`,
    { withCredentials: true }
  );

  console.log(response);
  if (response.status === 200) {
    return response;
  } else {
    return undefined;
  }
};

export default loginCall;
