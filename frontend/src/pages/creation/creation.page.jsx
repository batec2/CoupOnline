import Cookies from "universal-cookie";
import { useEffect, useState } from "react";
import axios from "axios";
import verifyAccount from "../../actions/verifyAccount.js";
import { useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Input } from "@/components/ui/input.jsx";
import { Button } from "@/components/ui/button.jsx";

const cookies = new Cookies();

/**
 * Page for playing game and interacting with game state
 * @returns Game Page
 */
const CreationPage = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [CurrentCookie, setCurrentCookie] = useState(
    cookies.get("PersonalCookie")
  );
  const [screenName, setScreenName] = useState("");
  const [Email, setEmail] = useState("");
  const [CreatedCookie, setCreatedCookie] = useState(false);

  useEffect(() => {
    if (CreatedCookie === true) {
      if (userName === "") {
        window.alert("Input a Username.");
        return;
      }
      verifyAccount(userName).then((res) => {
        if (res === true) {
          window.alert("Account with this username already exists.");
          return;
        }
        if (screenName === "") {
          window.alert("Input a ScreenName.");
          return;
        }
        if (Email === "") {
          window.alert("Input an Email.");
          return;
        }
        // src: https://www.simplilearn.com/tutorials/javascript-tutorial/email-validation-in-javascript
        const emailRegex =
          /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (!emailRegex.test(Email)) {
          window.alert("Not a Valid Email Address, Input a Valid Email.");
          return;
        }
        const makeNewAccount = async () => {
          const response = await axios.post(
            "http://localhost:8080/players",
            { userName: userName, screenName: screenName, email: Email },
            {
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json;charset=UTF-8",
              },
            }
          );

          cookies.set("PersonalCookie", {
            id: response.data._id,
            username: response.data.userName,
            screenName: response.data.userName,
          });
          setCurrentCookie(cookies.get("PersonalCookie"));
          navigate("/room");
        };

        if (CreatedCookie === true) {
          makeNewAccount();
        }
      });
      setCreatedCookie(false);
    }
  }, [CreatedCookie, Email, userName, screenName, CurrentCookie]);

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      setCreatedCookie(true);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-4">Account Creation Page</h1>
      <label className="text-xl mb-2">User Name</label>
      <Input
        type="username"
        placeholder="User Name"
        onChange={(e) => setUserName(e.target.value)}
        onKeyPress={handleKeyPress}
        className="w-64 px-4 py-2 border rounded-md mb-2"
      />
      <label className="text-xl mb-2">Screen Name</label>
      <Input
        type="screenname"
        placeholder="Screen Name"
        onChange={(e) => setScreenName(e.target.value)}
        onKeyPress={handleKeyPress}
        className="w-64 px-4 py-2 border rounded-md mb-2"
      />
      <label className="text-xl mb-2">Email</label>
      <Input
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        onKeyPress={handleKeyPress}
        className="w-64 px-4 py-2 border rounded-md mb-4"
      />
      <Button
        onClick={() => setCreatedCookie(true)}
        className="bg-blue-400 text-white px-4 py-2 rounded-md"
      >
        Create Account
      </Button>
    </div>
  );
};

export default CreationPage;
