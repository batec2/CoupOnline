import { Button } from "../../ui/button";
import ButtonClass from "@/lib/buttonClassEnum";

/**
 * Generates a button for one of the actions the player can perform
 * @param {Number} buttonClass integer corresponding to item in buttonClassenum
 * @param {function} onClick function to execute when the button is clicked
 * @param {String} text text to display on the button 
 * @returns 
 */
const ActionButton = ({ buttonClass, onClick, text }) => {
  let buttonColor = "";

  //Button colour depends on class of button
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

  let cName = `${buttonColor} max-w-44 hover:opacity-50`;
  
  return (
    <Button
      className={cName}
      onClick={() => {
        if (buttonClass != ButtonClass.Unavailable) { //Clicking unavailable button does nothing
          onClick();
        }
      }}
    >
      {text}
    </Button>
  );
};

export default ActionButton;
