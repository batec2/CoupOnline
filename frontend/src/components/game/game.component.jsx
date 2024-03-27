import useGameContext from "@/context/useGameContext";
import Actions from "./gameActions/actions.component";
import PlayerCards from "./gameCards/playerCards.component";
import GameInfo from "./gameInfo/gameInfo.component";
import CardList from "../cardList/cardList.component";
import References from "./references/references.component";

//For testing only - remove later
const discard = {
  0: { card: "Duke", count: 0 },
  1: { card: "Assassin", count: 0 },
  2: { card: "Ambassador", count: 0 },
  3: { card: "Captain", count: 0 },
  4: { card: "Contessa", count: 0 },
};

const Game = () => {
  const { roomId, currentLobbyMembers, gameCards } = useGameContext();
  return (
    <div>
      <p className="flex justify-center text-3xl font-bold">Room: {roomId}</p>
      <p>{JSON.stringify(currentLobbyMembers)}</p>
      <div className="grid grid-cols-4 border divide-y divide-x">
        <CardList items={currentLobbyMembers} context={"players"} />
        <div className="col-span-2">
          <GameInfo />
        </div>
        <CardList items={discard} context={"discard"} />
        <PlayerCards />
        <div className="col-span-2">
          <Actions />
        </div>
        <References />
      </div>
    </div>
  );
};

export default Game;
