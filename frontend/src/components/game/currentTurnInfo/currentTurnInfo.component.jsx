import GameSectionTitle from "@/components/text/gameSectionTitle.component";
import useGameContext from "@/context/useGameContext";
import GameActions from "@/lib/actionEnum";
import terminal from "virtual:terminal";

/**
 * Generates view that shows information about the current game turn
 * @returns React UI element for current turn info view
 */
const CurrentTurnInfo = () => {
  const { 
    currentLobbyMembers, 
    initialUserId, 
    initialAction, 
    responseInitialAction, 
    responseInitialId,
    responseSecondaryAction,
    responseSecondaryId,
    targetId,
    correctShown,
  } = useGameContext();

  const displayCurrentTurnPlayer = () => {
      return (
        <div>
        <p>It is {currentLobbyMembers[initialUserId].userId}'s turn</p>
        </div>
      )
  }

  const displayInitialAction = () => {
    if(initialAction) {
      return (
        <p>{currentLobbyMembers[initialUserId].userId} declares {GameActions[initialAction]}</p>
      )
    } else {
      return (
        <p>Waiting for Initial Action.</p>
      )
    }
  }

  const displayTarget = () => {
    if(targetId) {
      return (
        <p>{currentLobbyMembers[initialUserId].userId} targets {currentLobbyMembers[targetId].userId}</p>
      )
    }
  }

  const displayResponseActionInitial = () => {
    if(!initialAction) {
      return <></>
    } else if (!responseInitialAction) {
      return <p>Waiting for Responses.</p>
    } else {
      return <p>{currentLobbyMembers[responseInitialId].userId} responds with {GameActions[responseInitialAction]}</p>
    }
  }

  const displayResponseActionSecondary = () => {
    if(!responseInitialAction) {
      return <></>
    } else if (!responseSecondaryAction) {
      return <p>Waiting for Responses.</p>
    } else {
      return <p>{currentLobbyMembers[responseSecondaryId].userId} responds with {GameActions[responseSecondaryAction]}</p>
    }
  }
  
  const displayCorrectShown = () => {
    if (correctShown) {
      if(responseInitialAction === GameActions.CalloutLie) {
        return <p>{currentLobbyMembers[initialUserId].userId} has shown the correct card, {currentLobbyMembers[responseInitialId].userId} must choose a card to lose</p>
      } else if (responseSecondaryAction === GameActions.CalloutLie) {
        return <p>{currentLobbyMembers[responseInitialId].userId} has shown the correct card, {currentLobbyMembers[responseSecondaryId].userId} must choose a card to lose</p>
      } 
    } else {
      return <></>
    }
  }
  const displayCardLost = () => {
    return <p>PLAYER has chosen to discard CARD</p>
  }

  return (
    <div className="p-1">
      <GameSectionTitle text={"Current Turn Info:"} />
      {displayCurrentTurnPlayer()}
      {displayInitialAction()}
      {displayTarget()}
      {displayResponseActionInitial()}
      {displayResponseActionSecondary()}
      {displayCorrectShown()}
    </div>
  );
};

export default CurrentTurnInfo;
