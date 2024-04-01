import CardItem from "./cardItem.component";
import GameSectionTitle from "../text/gameSectionTitle.component";
import useGameContext from "@/context/useGameContext";
import GameCard from "@/lib/cardEnum";

/**
 * List of players and remaining cards
 * @param {String} placeholder - The placeholder text
 * @returns Textfield
 */
const DiscardList = () => {
  const  { discardDeck, coins } = useGameContext();

  return (
    <div className="p-1">
      <GameSectionTitle text={"Discarded Cards:"} />
      <div className="flex flex-col w-40 space-y-1">
        {discardDeck.map((quantity, index) => (
          <CardItem
            key={index}
            item={Object.keys(GameCard)[index]}
            count={quantity}
            context={"discard"}
          />
        ))}
      </div>
    </div>
  );
};

export default DiscardList;
