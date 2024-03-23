import CardItem from "./cardItem.component";

import './playerList.styles.css'

/**
 * List of players and remaining cards
 * @param {String} placeholder - The placeholder text 
 * @returns Textfield
 */
const CardList = ({ cardList, context }) => {
  return(
    <div className="cardList">
      {cardList.map(item => (
        <CardItem item={item.item} count={item.count} context={context} /> 
      ))}
    </div>
  )
}

export default CardList;