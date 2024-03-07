import Cookies from "universal-cookie";
import { useEffect, useState } from "react";
import axios from "axios";
import verifyAccount from "../../actions/verifyAccount.js";
import { Input } from "@/components/ui/input.jsx";
import { Button } from "@/components/ui/button.jsx";

const cookies = new Cookies();

/**
 * Page for playing game and interacting with game state
 * @returns Game Page
 */
const CreationPage = () => {
  const [userName, setUserName] = useState("");
  const [CurrentCookie, setCurrentCookie] = useState(
    cookies.get("PersonalCookie")
  );
  const [screenName, setScreenName] = useState("");
  const [Email, setEmail] = useState("");
  const [CreatedCookie, setCreatedCookie] = useState(false);

  useEffect(() => {
    if (CreatedCookie === true) {
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

          cookies.set("PersonalCookie", response.data._id);
          setCurrentCookie(cookies.get("PersonalCookie"));
        };

        if (CreatedCookie === true) {
          makeNewAccount();
        }
      });
      setCreatedCookie(false);
    }
  }, [CreatedCookie, Email, userName, screenName, CurrentCookie]);

  return (
    <div>
      <h1>Creation Page</h1>
      <p>User Name</p>
      <Input
        type="username"
        onChange={(e) => setUserName(e.target.value)}
      ></Input>
      <br />
      <p>Screen Name</p>
      <Input
        type="screenname"
        onChange={(e) => setScreenName(e.target.value)}
      ></Input>
      <br />
      <p>Email</p>
      <Input type="email" onChange={(e) => setEmail(e.target.value)}></Input>
      <br />
      <Button
        onClick={() => {
          setCreatedCookie(true);
        }}
      >
        Create Account
      </Button>
    </div>
  );
};

export default CreationPage;
