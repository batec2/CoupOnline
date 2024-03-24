import useGameContext from "@/context/useGameContext";
import { Button } from "../../ui/button";
import ButtonClass from "@/lib/buttonClassEnum";

const ActionButton = ({ buttonClass, onClick, text }) => {
  const { setInitialUserId, setInitialAction } = useGameContext();

  let buttonColor = "";

  switch (buttonClass) {
    case ButtonClass.Normal: {
      buttonColor = "bg-actions-normal";
      break;
    }
    case ButtonClass.Unavailable: {
      buttonColor = "bg-actions-unavailable";
      break;
    }
    case ButtonClass.HaveCard: {
      buttonColor = "bg-actions-haveCard";
      break;
    }
    case ButtonClass.Bluff: {
      buttonColor = "bg-actions-bluff";
      break;
    }
    case ButtonClass.Callout: {
      buttonColor = "bg-actions-callout";
    }
  }

  let cName = `${buttonColor} w-40 hover:${buttonColor} hover:opacity-70`;
  return (
    <Button
      className={cName}
      onClick={() => {
        if (buttonClass != ButtonClass.Unavailable) {
          onClick();
        }
      }}
    >
      {text}
    </Button>
  );
};

export default ActionButton;
