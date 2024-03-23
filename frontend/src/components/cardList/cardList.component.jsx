import CardItem from "./cardItem.component";

/**
 * List of players and remaining cards
 * @param {String} placeholder - The placeholder text 
 * @returns Textfield
 */
const CardList = ({ items, context }) => {
  const name = (context="players") ? "userId" : "card";
  const keys = Object.keys(items);

  const title = (context="players") ? "Players:" : "Graveyard:"

  return(
    <div>
      <text className="text-lg font-semibold underline">{title}</text>
      <div className="flex flex-col w-40">
        {keys.map((key) => 
          <CardItem item={items[key][name]} count={2} context={context} /> 
        )}
      </div>
    </div>
  )
}

export default CardList;