import Cookies from "universal-cookie";
import {useEffect, useState} from "react";
import axios from "axios";

const cookies = new Cookies()

/**
 * Page for playing game and interacting with game state
 * @returns Game Page
 */
const CreationPage = () => {
  const [userName, setUserName] = useState("")
  const [CurrentCookie, setCurrentCookie] = useState(cookies.get("PersonalCookie"))
  const [screenName, setScreenName] = useState("")
  const [Email, setEmail] = useState("")
  const [CreatedCookie, setCreatedCookie] = useState(false)
  const createAccount = () => {
    setCreatedCookie(true)
  }
  useEffect(() => {
    const makeNewCookie  = async () =>  {
      const response = await axios.post("http://localhost:8080/players",
        {userName: userName, screenName: screenName, email: Email},
        {headers: {
            Accept: "application/json",
            "Content-Type": "application/json;charset=UTF-8",
            },})
      cookies.set("PersonalCookie", response.data)
      setCurrentCookie(cookies.get("PersonalCookie"))
    }
    if(CreatedCookie === true && CurrentCookie === undefined){
      makeNewCookie()
    }
  }, [CreatedCookie, Email, userName, screenName, CurrentCookie]);



  return (
    <div>
      <h1>Creation Page</h1>
      <p>User Name</p><input type="text" onChange={(e) => setUserName(e.target.value)}/><br/>
      <p>Screen Name</p><input type="text" onChange={(e) => setScreenName(e.target.value)}/><br/>
      <p>Email</p><input type="email" onChange={(e) => setEmail(e.target.value)}/><br/>
      <button onClick={createAccount}>Create Account</button>
    </div>
  );
};

export default CreationPage;