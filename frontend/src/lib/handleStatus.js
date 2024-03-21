const handleStatus = ({ status }) => {
  if (!status) {
    console.log("Error: No status received");
    return;
  }
  console.log(status);
};

export default handleStatus;
