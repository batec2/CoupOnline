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
    currentTurnId, 
    initialAction, 
    responseInitialAction, 
    responseInitialId,
    responseSecondaryAction,
    responseIdRef, 
    targetId} = useGameContext();

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
        <p>{currentLobbyMembers[initialUserId].userId} has targeted {currentLobbyMembers[targetId].userId}</p>
      )
    }
  }

  const displayResponseActionInitial = () => {
    if(!initialAction) {
      return <></>
    } else if (!responseInitialAction) {
      return <p>Waiting for Responses.</p>
    } else {
      return <p>{responseInitialId} responds with {GameActions[responseInitialAction]}</p>
    }
  }

  const displayResponseActionSecondary = () => {
    if(!responseInitialAction) {
      return <></>
    } else if (!responseSecondaryAction) {
      return <p>Waiting for Responses.</p>
    } else {
      return <p>Secondary Response Action: {GameActions[responseSecondaryAction]} by ...</p>
    }
  }
  
  const displayShownCard = () => {
    return <p>PLAYER shows CARD</p>
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
    </div>
  );
};

export default CurrentTurnInfo;
