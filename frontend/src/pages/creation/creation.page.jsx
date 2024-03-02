import Cookies from "universal-cookie";
import {io} from "socket.io-client";
import {useEffect, useState} from "react";
import axios from "axios";

const cookies = new Cookies()

/**
 * Page for playing game and interacting with game state
 * @returns Game Page
 */
const CreationPage = () => {
  const [FirstName, setFirstName] = useState("")
  const currentCookie = cookies.get("PersonalCookie")
  const [LastName, setLastName] = useState("")
  const [Email, setEmail] = useState("")
  const [Age, setAge] = useState(0)
  const [CreatedCookie, setCreatedCookie] = useState(false)
  const createAccount = () => {
    setCreatedCookie(true)
  }

  useEffect(() => {
    const makeNewCookie  = async () =>  {
      const response = await axios.post("http://localhost:8080/player",
        {body: {firstName: FirstName, lastName: LastName, email: Email, age: Age}},
        {headers: {
            Accept: "application/json",
            "Content-Type": "application/json;charset=UTF-8",
            },})
      cookies.set("PersonalCookie", response.data)
    }
    if(CreatedCookie === false && currentCookie === undefined){
      makeNewCookie()
    }
  }, [Age, CreatedCookie, Email, FirstName, LastName, currentCookie]);



  return (
    <div>
      <h1>Creation Page</h1>
      <p>First Name</p><input type="text" onChange={(e) => setFirstName(e.target.value)}/><br/>
      <p>Last Name</p><input type="text" onChange={(e) => setLastName(e.target.value)}/><br/>
      <p>Email</p><input type="email" onChange={(e) => setEmail(e.target.value)}/><br/>
      <p>Age</p><input type="number" onChange={(e) => setAge(e.target.value)}/><br/>
      <button onClick={createAccount}>Create Account</button>
    </div>
  );
};

export default CreationPage;