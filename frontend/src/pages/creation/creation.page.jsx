import Cookies from "universal-cookie";
import {io} from "socket.io-client";
import {useState} from "react";

const cookies = new Cookies()

/**
 * Page for playing game and interacting with game state
 * @returns Game Page
 */
const CreationPage = () => {
  const socket = io("http://localhost:8080");
  const newCookie = cookies.get("PersonalCookie");
  const [FirstName, setFirstName] = useState("")
  const [LastName, setLastName] = useState("")
  const [Email, setEmail] = useState("")
  const [Age, setAge] = useState(0)
  const createAccount = () => {

  }




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