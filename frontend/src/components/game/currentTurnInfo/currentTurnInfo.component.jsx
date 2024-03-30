import GameSectionTitle from "@/components/text/gameSectionTitle.component";
import useGameContext from "@/context/useGameContext";
import GameActions from "@/lib/actionEnum";

const CurrentTurnInfo = () => {
  const { currentLobbyMembers, initialUserId, currentTurnId, initialAction, 
          responseAction, responseIdRef} = useGameContext();

  const displayCurrentTurnPlayer = () => {
    if(initialUserId) {
      return (
        <p>It is {currentLobbyMembers[initialUserId].userId}'s turn</p>
      )
    } else {
      return (
        <p>It is {currentTurnId}'s turn</p>
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

  const displayResponseAction = () => {
    if(!initialAction) {
      return <></>
    } else if (!responseAction) {
      return <p>Waiting for Responses.</p>
    } else {
      return <p>Response Action: {GameActions[responseAction]} by ...</p>
    }
  }

  return (
    <div className="p-1">
      <GameSectionTitle text={"Current Turn Info:"} />
      {displayCurrentTurnPlayer()}
      {displayInitialAction()}
      {displayResponseAction()}
    </div>
  );
};

export default CurrentTurnInfo;
