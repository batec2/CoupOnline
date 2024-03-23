import card from './card32.png'
import tombstone from './tombstone32.png'

/**
 * Player Overview for list of players
 * @param {String} player Player object, containing player name and number of cards 
 * @returns PlayerItem React component
 */
const CardItem = ({ item, count, context }) => {
  if(count > 0) {
    return (
      <div className="grid grid-cols-5">
        <text className="text-right col-span-3">{item}</text>
        {Array.from({length: count}, () => 
        <img className="flex flex-row" src={card} alt="card" />
        )}
      </div>
    )
  } else if (context == "players") {
    return(
      <div className="flex flex-row">
        <text className="textPName">{item}</text>
        <img className="imgCard" src={tombstone} alt="dead" />
      </div>
    )
  } else {

  }
}
  

export default CardItem;