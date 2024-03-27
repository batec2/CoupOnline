import useGameContext from "@/context/useGameContext";

const GameInfo = () => {
  const { currentLobbyMembers, currentTurnId, requestAction, coins } =
    useGameContext();

  return (
    <div>
      {/* <p>Currently Playing: {currentLobbyMembers[currentTurnId].userId}</p> */}
      <p>Last Action: {requestAction ? JSON.stringify(requestAction) : ""}</p>
      <p>Your Coins: {coins}</p>
    </div>
  );
};

export default GameInfo;
