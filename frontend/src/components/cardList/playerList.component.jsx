import CardItem from "./cardItem.component";
import GameSectionTitle from "../text/gameSectionTitle.component";
import useGameContext from "@/context/useGameContext";
import terminal from "virtual:terminal"

/**
 * Generates UI element showing list of players and their remaining cards
 * @returns React UI elment PlayerCardList
 */
const PlayerCardList = () => {
  const { currentLobbyMembers, playerCardCount } = useGameContext();
  const members = Object.keys(currentLobbyMembers);
  terminal.log(currentLobbyMembers)

  return (
    <div className="p-1">
      <GameSectionTitle text={"Player Cards Remaining:"} />
      <div className="flex flex-col w-40 space-y-1">
        {members.map((member) => (
          <CardItem
            key={member}
            item={currentLobbyMembers[member].screenname}
            count={playerCardCount[member]}
            context={"players"}
          />
        ))}
      </div>
    </div>
  );
};

export default PlayerCardList;
