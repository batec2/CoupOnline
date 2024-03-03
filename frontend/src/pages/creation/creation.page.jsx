import Cookies from "universal-cookie";
import {useEffect, useState} from "react";
import axios from "axios";
import verifyAccount from "../../actions/verifyAccount.js";

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

  useEffect(() => {
    if(CreatedCookie === true){
      if (userName === ""){
        window.alert("Input a Username.")
        return
      }
      verifyAccount(userName).then((res) => {
          if (res === true){
            window.alert("Account with this username already exists.")
            return
          }
          if (screenName === ""){
            window.alert("Input a ScreenName.")
            return
          }
          if (Email === ""){
            window.alert("Input an Email.")
            return
          }
          // src: https://www.simplilearn.com/tutorials/javascript-tutorial/email-validation-in-javascript
          const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
          if (!emailRegex.test(Email)){
            window.alert("Not a Valid Email Address, Input a Valid Email.")
            return;
          }
          const makeNewAccount  = async () =>  {
            const response = await axios.post("http://localhost:8080/players",
            {userName: userName, screenName: screenName, email: Email},
           {headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json;charset=UTF-8",
                    },
                  })

            cookies.set("PersonalCookie", response.data._id)
            setCurrentCookie(cookies.get("PersonalCookie"))
          }

        if(CreatedCookie === true){
          makeNewAccount()
        }
        })
    setCreatedCookie(false)
  }}, [CreatedCookie, Email, userName, screenName, CurrentCookie]);



  return (
    <div>
      <h1>Creation Page</h1>
      <p>User Name</p><input type="text" onChange={(e) => setUserName(e.target.value)}/><br/>
      <p>Screen Name</p><input type="text" onChange={(e) => setScreenName(e.target.value)}/><br/>
      <p>Email</p><input type="email" onChange={(e) => setEmail(e.target.value)}/><br/>
      <button onClick={() => {setCreatedCookie(true)}}>Create Account</button>
    </div>
  );
};

export default CreationPage;