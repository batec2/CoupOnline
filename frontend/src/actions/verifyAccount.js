import { terminal } from 'virtual:terminal'
import axios from "axios";


const verifyAccount = async (username, setVerified) => {
  try {
    const response = await axios.get(`http://localhost:8080/players/byName/${username}`)
      .catch(() => {return false})
    console.log(response)
    if (response.status === 200) {
      return true
    }
  }catch (e){
    return false
  }
  return false
}

export default verifyAccount;