import { useState } from "react";
import { useNavigate } from "react-router-dom";

import TextField from "../../components/textfield/textfield.component";
import verifyAccount from "../../actions/verifyAccount";

/**
 * Page for logging into account or creating account
 * @returns Login Page
 */
const LoginPage = () => {
    const navigate = useNavigate();

    const[username, setUsername] = useState([]);
    const[verified, setVerified] = useState(false)

    const handleUsernameInput = e => {
      setUsername(e.target.value);
    }

    const handleCreateClick = () => {
      navigate("/creation")
    }

    return (
      <div>
        <h1>Welcome to Super Couper</h1>
        <h2>Enter your username:</h2>
        <TextField placeholder="Username" onChange={handleUsernameInput}/>
        <button onClick={verifyAccount(username, setVerified)}>Login</button>
        <h2>No account?</h2>
        <button onClick={handleCreateClick}>Create an account</button>
      </div>
    );
  };
  
  export default LoginPage;
  