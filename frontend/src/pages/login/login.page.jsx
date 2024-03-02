import { useState } from "react";

import TextField from "../../components/textfield/textfield.component";
import verifyAccount from "../../actions/verifyAccount";

/**
 * Page for logging into account or creating account
 * @returns Login Page
 */
const LoginPage = () => {
    return (
      <div>
        <h1>Welcome to Super Couper</h1>
        <h2>Enter your username:</h2>
        <TextField placeholder="Username" onChange={handleUsernameInput}/>
        <button onClick={verifyAccount(username)}>Login</button>
        <h2>No account?</h2>
        <button>Create an account</button>
      </div>
    );
  };
  
  export default LoginPage;
  