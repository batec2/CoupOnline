import CardItem from "./cardItem.component";
import GameSectionTitle from "../text/gameSectionTitle.component";
import useGameContext from "@/context/useGameContext";

/**
 * List of players and remaining cards
 * @param {String} placeholder - The placeholder text
 * @returns Textfield
 */
const PlayerCardList = () => {

  const {currentLobbyMembers} = useGameContext();
  const members = Object.keys(currentLobbyMembers);
  
  return (
    <div className="p-1">
      <GameSectionTitle text={"Player Cards Remaining:"} />
      <div className="flex flex-col w-40 space-y-1">
        {members.map((member) => (
          <CardItem
            key={member}
            item={currentLobbyMembers[member].userId}
            count={2}
            context={"players"}
          />
        ))}
      </div>
    </div>
  );
};

export default PlayerCardList;
