import useGameContext from "@/context/useGameContext";
import PlayerCards from "../gameCards/playerCards.component";
import Actions from "../gameActions/actions.component";
import GameSectionTitle from "@/components/text/gameSectionTitle.component";

const PlayerInfo = () => {
  const { coins } = useGameContext();

  return (
    <div className="p-1">
      <GameSectionTitle text={"Your Info:"} />
      <p>Coins: {coins}</p>
      <PlayerCards />
      <Actions />
    </div>
  );
};

export default PlayerInfo;
