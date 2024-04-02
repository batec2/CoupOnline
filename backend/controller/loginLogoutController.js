import {getPlayerFromRepo} from "../repository/playerRepository.js";

// Handle 404 errors to show user when a player is not found
const handlePlayerNotFound = (res, id) => {
  res.status(404).send(`Player ${id} not found`);
};

// Handle errors
const handleError = (res, status, message) => {
  res.status(status).send(message);
};

const login = async (req, res) => {
  const { username } = req.params;
  try {
    const player = await getPlayerFromRepo({ userName: username });
    console.log("IS BEING RUN")
    if (!player) {
      handlePlayerNotFound(res, id);
    } else{
      const userInfo = {
          _id: player._id,
          userName: player.userName,
          screenName: player.screenName,
        }
      req.session.user = userInfo
      res.status(200).send(userInfo)

    }
  } catch (error) {
    handleError(
      res,
      500,
      `Failed to fetch player ${username}: ${error.message}`
    );
  }
}

const logout = async (req, res) => {

}
const checkForValidSession = (req, res) => {

}

export {login, checkForValidSession}