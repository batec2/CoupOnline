import CardItem from "./cardItem.component";
import GameSectionTitle from "../text/gameSectionTitle.component";
import useGameContext from "@/context/useGameContext";

/**
 * Generates UI element showing list of players and their remaining cards
 * @returns React UI elment PlayerCardList
 */
const PlayerCardList = () => {
  const { currentLobbyMembers, playerCardCount } = useGameContext();
  const members = Object.keys(currentLobbyMembers);

  return (
    <div className="p-1">
      <GameSectionTitle text={"Player Cards Remaining:"} />
      <div className="flex flex-col w-40 space-y-1">
        {members.map((member) => (
          <CardItem
            key={member}
            item={currentLobbyMembers[member].id}
            count={playerCardCount[member]}
            context={"players"}
          />
        ))}
      </div>
    </div>
  );
};

export default PlayerCardList;
