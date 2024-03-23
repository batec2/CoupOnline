import useGameContext from "@/context/useGameContext";
import Actions from "./gameActions/actions";
import PlayerCards from "./gameCards/playerCards";
import GameInfo from "./gameInfo/gameInfo.component";
import CardList from "../cardList/cardList.component";
import References from "./references/references.component";

const Game = () => {
  const { roomId, currentLobbyMembers } = useGameContext();
  return (
    <div>
      <h1>Room: {roomId}</h1>
      <div className="grid grid-cols-5">
        <CardList items={currentLobbyMembers} context={"players"}/>
        <div className="col-span-3">
          <GameInfo />
        </div>
        <p>GRAVEYARD GOES HERE</p>
        <References />
        <div className="col-span-3">
          <PlayerCards></PlayerCards>
        </div>
        <Actions></Actions>
      </div>
    </div>
  );
};

export default Game;
