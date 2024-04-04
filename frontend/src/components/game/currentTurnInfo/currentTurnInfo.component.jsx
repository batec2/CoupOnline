import GameSectionTitle from "@/components/text/gameSectionTitle.component";
import useGameContext from "@/context/useGameContext";
import GameActions from "@/lib/actionEnum";

/**
 * Generates view that shows information about the current game turn
 * @returns React UI element for current turn info view
 */
const CurrentTurnInfo = () => {
  const { currentLobbyMembers, initialUserId, currentTurnId, initialAction, 
          responseInitialAction, responseIdRef, targetId} = useGameContext();

  const displayCurrentTurnPlayer = () => {
      return (
        <div>
        <p>It is {initialUserId}'s CURRENT ID turn</p>
        </div>
      )
  }

  const displayTarget = () => {
      if(targetId) {
        return (
          <p>Targetting: {targetId}</p>
        )
      }
    }

  const displayInitialAction = () => {
    if(initialAction) {
      return (
        <p>Initial Action: {GameActions[initialAction]}</p>
      )
    } else {
      return (
        <p>Waiting for Initial Action.</p>
      )
    }
  }

  const displayResponseActionInitial = () => {
    if(!initialAction) {
      return <></>
    } else if (!responseAction) {
      return <p>Waiting for Responses.</p>
    } else {
      return <p>Initial Response Action: {GameActions[responseAction]} by ...</p>
    }
  }

  const displayResponseActionSecondary = () => {
    if(!initialAction) {
      return <></>
    } else if (!responseAction) {
      return <p>Waiting for Responses.</p>
    } else {
      return <p>Secondary Response Action: {GameActions[responseAction]} by ...</p>
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
    </div>
  );
};

export default CurrentTurnInfo;
