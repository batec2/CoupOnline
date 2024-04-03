import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const checkIfLoggedInCall = async () => {
  const personalCookie = cookies.get("PersonalCookie")
  try {
    const response = await axios.get(
    `http://localhost:8080/loginLogout/checkLogin/`
  ,{ withCredentials: true ,
          params: {
            personalCookie: personalCookie
          }});
    if(response.data.id !== personalCookie.id ||
       response.data.userName !== personalCookie.username ||
       response.data.screenName !== personalCookie.screenName ){
      return undefined
    }
    return response
  }catch (e){
    return undefined
  }

};

export default checkIfLoggedInCall;