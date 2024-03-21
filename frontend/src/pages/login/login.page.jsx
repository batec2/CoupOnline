import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { terminal } from "virtual:terminal";

import TextField from "../../components/textfield/textfield.component.jsx";
import verifyAccount from "../../actions/verifyAccount";
import Cookies from "universal-cookie";
import retrieveAccountById from "../../actions/retrieveAccountById.js";
import retrieveAccountByName from "../../actions/retrieveAccountByName.js";
import { Button } from "@/components/ui/button.jsx";
import { Input } from "@/components/ui/input.jsx";

const cookies = new Cookies();

/**
 * Page for logging into account or creating account
 * @returns Login Page
 */
const LoginPage = () => {
  const navigate = useNavigate();
  const username = useRef();
  const [LocalCookie, setLocalCookie] = useState(cookies.get("PersonalCookie"));
  // const [username, setUsername] = useState([]);
  const [verified, setVerified] = useState(false);

  const handleUsernameInput = (e) => {
    // setUsername(e.target.value);
    username.current = e.target.value;
  };

  const handleCreateClick = () => {
    navigate("/creation");
  };

  const handleLoginClick = async () => {
    const verif = await verifyAccount(username.current, setVerified);
    terminal.log(verif);
    if (verif) {
      retrieveAccountByName(username.current).then((res) => {
        cookies.set("PersonalCookie", res.data._id);
      });
      navigate("/room");
    } else {
      window.alert("Account Does not Exist.");
    }
  };

  useEffect(() => {
    if (LocalCookie !== undefined) {
      retrieveAccountById(LocalCookie).then((res) => {
        // setUsername(res.data.username);
        username.current = res.data.username;
        navigate("/room");
      });
    }
  }, [LocalCookie]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-4">Welcome to Super Couper</h1>
      <h2 className="text-xl mb-2">Enter your username:</h2>
      <Input
        type="username"
        placeholder="User Name"
        onChange={handleUsernameInput}
        className="w-60 px-4 py-2 border rounded-md mb-4"
      />
      <Button
        onClick={handleLoginClick}
        className="bg-blue-500 text-white px-4 py-2 rounded-md mb-2"
      >
        Login
      </Button>
      <h2 className="text-xl mb-2">No account?</h2>
      <Button
        onClick={handleCreateClick}
        className="bg-green-500 text-white px-4 py-2 rounded-md"
      >
        Create an account
      </Button>
    </div>
  );
};

export default LoginPage;
