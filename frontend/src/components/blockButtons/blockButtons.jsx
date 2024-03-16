import { handleResponseAction } from "@/actions/socketActions";
import { Button } from "../ui/button";

const BlockButtons = ({ text, socket, roomId, userId, action }) => {
  return (
    <Button
      onClick={() => {
        handleResponseAction(socket, roomId, userId, action);
      }}
    >
      {text}
    </Button>
  );
};

export default BlockButtons;
