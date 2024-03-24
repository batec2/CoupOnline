import CardItem from "./cardItem.component";
import GameSectionTitle from "../text/gameSectionTitle.component";

/**
 * List of players and remaining cards
 * @param {String} placeholder - The placeholder text
 * @returns Textfield
 */
const CardList = ({ items, context }) => {
  const name = context == "players" ? "userId" : "card";
  const keys = Object.keys(items);

  const title = context == "players" ? "Players:" : "Discarded Cards:";

  return (
    <div>
      <GameSectionTitle text={title} />
      <div className="flex flex-col w-40 space-y-1">
        {keys.map((key) => (
          <CardItem
            key={key}
            item={items[key][name]}
            count={2}
            context={context}
          />
        ))}
      </div>
    </div>
  );
};

export default CardList;
