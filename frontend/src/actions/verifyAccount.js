import { terminal } from 'virtual:terminal'
import axios from "axios";


const verifyAccount = async (username, setVerified) => {
  const response = await axios.get(`http://localhost:8080/players/byName/${username}`)
  if(response.status == 200) {
    return true
  }
  return false
}

export default verifyAccount;