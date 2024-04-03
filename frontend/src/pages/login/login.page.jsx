import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { terminal } from "virtual:terminal";
import verifyAccount from "../../actions/verifyAccount";
import Cookies from "universal-cookie";
import retrieveAccountById from "../../actions/retrieveAccountById.js";
import loginCall from "../../actions/retrieveAccountByName.js";
import { Button } from "@/components/ui/button.jsx";
import { Input } from "@/components/ui/input.jsx";
import checkIfLoggedInCall from "@/actions/checkIfActiveSession.js";

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
    login();
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      login();
    }
  };

  const login = async () => {
    const verif = await verifyAccount(username.current, setVerified);
    if (verif) {

      loginCall(username.current).then((res) => {
        console.log(res)
        cookies.set("PersonalCookie", {
          id: res.data.id,
          username: res.data.userName,
          screenName: res.data.screenName,
        });
        //Creates socketio client and connects to server
        setLocalCookie(cookies.get("PersonalCookie"));
        navigate("/room");
      });
    } else {
      window.alert("Account Does not Exist.");
    }
  };

  useEffect(() => {
    checkIfLoggedInCall().then((res) => {
      if(res !== undefined && res.status === 200){
        username.current = res.data.username;
        navigate("/room");
      }
    })
  }, [LocalCookie]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-4 text-center">
          Welcome to Super Couper
      </h1>
      <div className="w-full max-w-sm px-4">  
        <h2 className="text-xl mb-2">Enter your username:</h2>
        <Input
          type="username"
          placeholder="User Name"
          onChange={handleUsernameInput}
          onKeyPress={handleKeyPress}
          className="px-4 py-2 border rounded-md mb-4 w-full text-textColor-dark"
        />
        <Button
          onClick={handleLoginClick}
          className="bg-button-secondaryButton px-4 py-2 rounded-md mb-2 w-full"
        >
          Login
        </Button>
        <h2 className="text-xl mb-2">No account?</h2>
        <Button
          onClick={handleCreateClick}
          className="px-4 py-2 rounded-md w-full"
        >
          Create an account
        </Button>
      </div>
    </div>
  );
};

export default LoginPage;
