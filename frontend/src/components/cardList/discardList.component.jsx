import CardItem from "./cardItem.component";
import GameSectionTitle from "../text/gameSectionTitle.component";
import useGameContext from "@/context/useGameContext";
import GameCard from "@/lib/cardEnum";

/**
 * Generates UI element for discarded card list
 * @returns UI element for discarded cards
 */
const DiscardList = () => {
  const  { discardDeck } = useGameContext();

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
