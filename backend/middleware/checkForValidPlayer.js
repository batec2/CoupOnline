const checkForNeededPlayerFields = async (req, res, next) => {
  const { body } = req;
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (
    body["userName"] === undefined ||
    body["screenName"] === undefined ||
    body["email"] === undefined
  ) {
    res.status(400).send("Missing Required Fields");
  } else if (!emailRegex.test(body["email"])) {
    res.status(400).send("Email is not a valid email");
  } else {
    next();
  }
};

export default checkForNeededPlayerFields;
