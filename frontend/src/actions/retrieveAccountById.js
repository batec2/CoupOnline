import axios from "axios";

const retrieveAccountById= async (id) => {

    const response = await axios.get(`http://localhost:8080/players/byId/${id}`)
    if (response.status === 200) {
      return response
    }else{
      return undefined
    }

}

export default retrieveAccountById;