import axios from "axios";

const retrieveAccountById = async (id) => {
  const response = await axios.get(
    `${import.meta.env.VITE_SERVER_URL}/players/byId/${id}`
  );
  if (response.status === 200) {
    return response;
  } else {
    return undefined;
  }
};

export default retrieveAccountById;
