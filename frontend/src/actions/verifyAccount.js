import { terminal } from 'virtual:terminal'
import { useNavigate } from "react-router-dom";

const verifyAccount = async (username, setVerified) => {
    const navigate = useNavigate();
    navigate("/room");
    terminal.log("Clicked on verify!");    
}

export default verifyAccount;