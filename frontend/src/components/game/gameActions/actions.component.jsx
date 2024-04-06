import useGameContext from "@/context/useGameContext";
import NormalActions from "./normalActions.component";
import ResponseActions from "./responseActions.component";
import ChooseCard from "@/lib/chooseCardEnum";

/**
 * React UI element that conditionally shows the current actions available
 * @returns Current Actions React Component
 */
const Actions = () => {
  const {
    isResponding,
    currentTurnId,
    isChoosing,
    chooseType,
    playerCardCount,
    cookieRef,
  } = useGameContext();
  const { id } = cookieRef.current; //user's information

  //Which actions are shown depends on whose turn / what point in turn it is
  if (isChoosing) {
    return <h2>Please select a card to show or lose</h2>;
  } else if (chooseType === ChooseCard.Exchange) {
    return <h2>Please select two cards to discard</h2>;
  } else if (id === currentTurnId && !isChoosing) {
    return <NormalActions></NormalActions>;
  } else if (playerCardCount[id] === 0) {
    return <h2>You're dead homie</h2>;
  } else if (isResponding) {
    return <ResponseActions></ResponseActions>;
  } else {
    return <h2>Waiting for your turn</h2>;
  }
};

export default Actions;
