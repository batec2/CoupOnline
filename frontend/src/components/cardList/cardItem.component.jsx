import card from './card32.png'
import tombstone from './tombstone32.png'

import './playerList.styles.css'

/**
 * Player Overview for list of players
 * @param {String} player Player object, containing player name and number of cards 
 * @returns PlayerItem React component
 */
const CardItem = ({ item, count, context }) => {
  if(count > 0) {
    return (
      <div className="cardItem">
        <text className="textPName">{item}</text>
        {Array.from({length: count}, () => 
        <img className="imgCard" src={card} alt="card" />
        )}
      </div>
    )
  } else if (context == "player") {
    return(
      <div className="cardItem">
        <text className="textPName">{item}</text>
        <img className="imgCard" src={tombstone} alt="dead" />
      </div>
    )
  } else {

  }
}
  

export default CardItem;