import useGameContext from "@/context/useGameContext";
import PlayerCards from "../playerCards/playerCards.component";
import Actions from "../gameActions/actions.component";
import GameSectionTitle from "@/components/text/gameSectionTitle.component";

/**
 * Generates a players information view, showing their cards, coins, and current
 * actions they can take
 * @returns React UI element for player information window
 */
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
