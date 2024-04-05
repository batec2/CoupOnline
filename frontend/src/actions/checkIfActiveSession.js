import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const checkIfLoggedInCall = async () => {
  const personalCookie = cookies.get("PersonalCookie");
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_SERVER_URL}/loginLogout/checkLogin/`,
      {
        withCredentials: true,
        params: {
          personalCookie: personalCookie,
        },
      }
    );
    if (
      response.data.id !== personalCookie.id ||
      response.data.userName !== personalCookie.username ||
      response.data.screenName !== personalCookie.screenName
    ) {
      return undefined;
    }
    return response;
  } catch (e) {
    console.log(e);
    return undefined;
  }
};

export default checkIfLoggedInCall;
