import CardItem from "./cardItem.component";

import './playerList.styles.css'

/**
 * List of players and remaining cards
 * @param {String} placeholder - The placeholder text 
 * @returns Textfield
 */
const CardList = ({ items, context }) => {
  const name = (context="players") ? "userId" : "card";
  const keys = Object.keys(items);
  return(
    <div className="flex flex-col">
      {keys.map((key) => 
        <CardItem item={items[key][name]} count={2} context={context} /> 
      )}
    </div>
  )
}

export default CardList;