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
  } = useGameContext();
  const displayCurrentTurnPlayer = () => {
    if (initialUserId) {
      return (
        <div>
          <p>It is {currentLobbyMembers[initialUserId].screenname}'s turn</p>
        </div>
      );
    }
  };

  const displayInitialAction = () => {
    if (initialAction) {
      return (
        <p>
          {currentLobbyMembers[initialUserId].screenname} declares{" "}
          {GameActions[initialAction]}
        </p>
      );
    } else {
      return <p>Waiting for Initial Action.</p>;
    }
  };

  const displayTarget = () => {
    if (targetId) {
      return (
        <p>
          {currentLobbyMembers[initialUserId].screenname} targets{" "}
          {currentLobbyMembers[targetId].screenname}
        </p>
      );
    }
  };

  const displayResponseActionInitial = () => {
    if (!initialAction) {
      return <></>;
    } else if (!responseInitialAction) {
      return <p>Waiting for Responses.</p>;
    } else {
      return (
        <p>
          {currentLobbyMembers[responseInitialId].screenname} responds with{" "}
          {GameActions[responseInitialAction]}
        </p>
      );
    }
  };

  const displayResponseActionSecondary = () => {
    if (!responseInitialAction) {
      return <></>;
    } else if (!responseSecondaryAction) {
      return <p>Waiting for Responses.</p>;
    } else {
      return (
        <p>
          {currentLobbyMembers[responseSecondaryId].screenname} responds with{" "}
          {GameActions[responseSecondaryAction]}
        </p>
      );
    }
  };

  const displayShownCard = () => {
    return <p>PLAYER shows CARD</p>;
  };
  const displayCardLost = () => {
    return <p>PLAYER has chosen to discard CARD</p>;
  };

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
