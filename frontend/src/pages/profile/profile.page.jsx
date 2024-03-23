import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const cookies = new Cookies();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const cookie = cookies.get("PersonalCookie");
        if (!cookie) {
          // redirect to login page if user is not logged in
          setErrorMessage(
            "Please login first ... you are being redirected to the login page"
          );
          setTimeout(() => {
            setErrorMessage(null);
            navigate("/");
          }, 1500);
          return;
        }

        const playersResponse = await axios.get(
          `http://localhost:8080/players/${cookie.id}`
        );
        setUser(playersResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchUserData();
  }, []);

  if (errorMessage) {
    return <div className="text-center">{errorMessage}</div>;
  }

  if (user) {
    return (
      <Card className="w-[380px] mx-auto">
        <CardHeader>
          <CardTitle>
            Welcome,{" "}
            {user &&
              user.userName &&
              user.userName.charAt(0).toUpperCase() + user.userName.slice(1)}
            !
          </CardTitle>{" "}
        </CardHeader>
        <CardContent>
          <CardDescription>
            <span className="font-semibold">User Name:</span> {user.userName}
          </CardDescription>
          <CardDescription>
            <span className="font-semibold">Screen Name:</span>{" "}
            {user.screenName}
          </CardDescription>
          <CardDescription>
            <span className="font-semibold">Email:</span>
          </CardDescription>
          <CardDescription>
            <span className="font-semibold">Games Won:</span>
          </CardDescription>
          <CardDescription>
            <span className="font-semibold">Games Lost:</span>
          </CardDescription>
          <CardDescription>
            <span className="font-semibold">Win Streak:</span>
          </CardDescription>
        </CardContent>
      </Card>
    );
  }
};

export default ProfilePage;
