import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { terminal } from "virtual:terminal";

import TextField from "../../components/textfield/textfield.component.jsx";
import verifyAccount from "../../actions/verifyAccount";
import Cookies from "universal-cookie";
import retrieveAccountById from "../../actions/retrieveAccountById.js";
import retrieveAccountByName from "../../actions/retrieveAccountByName.js";

const cookies = new Cookies();

/**
 * Page for logging into account or creating account
 * @returns Login Page
 */
const LoginPage = () => {
  const navigate = useNavigate();
  const [LocalCookie, setLocalCookie] = useState(cookies.get("PersonalCookie"));
  const [username, setUsername] = useState([]);
  const [verified, setVerified] = useState(false);

  const handleUsernameInput = (e) => {
    setUsername(e.target.value);
  };

  const handleCreateClick = () => {
    navigate("/creation");
  };

  const handleLoginClick = async () => {
    const verif = await verifyAccount(username, setVerified);
    terminal.log(verif);
    if (verif) {
      retrieveAccountByName(username).then((res) => {
        cookies.set("PersonalCookie", res.data._id);
      });
      navigate("/room");
    }
  };

  useEffect(() => {
    if (LocalCookie !== undefined) {
      retrieveAccountById(LocalCookie).then((res) => {
        setUsername(res.data.username);
        navigate("/room");
      });
    }
  }, [LocalCookie]);

  return (
    <div>
      <h1>Welcome to Super Couper</h1>
      <h2>Enter your username:</h2>
      <TextField placeholder="Username" onChange={handleUsernameInput} />
      <button onClick={handleLoginClick}>Login</button>
      <h2>No account?</h2>
      <button onClick={handleCreateClick}>Create an account</button>
    </div>
  );
};

export default LoginPage;
