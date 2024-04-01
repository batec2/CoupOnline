import card from "./card32inv.png";
import tombstone from "./tombstone32inv.png";0

/**
 * UI element for a car/player name and number of cards
 * @param {String} player Player object, containing player name and number of cards
 * @returns PlayerItem React component
 */
const CardItem = ({ item, count, context }) => { 
  const displayCards = (count, context) => {
    if(context == "discard" || count > 0) { //Displaying number of cards
      return (
        <div className="flex flex-row">
          {Array.from({ length: count }, (e, idx) => (
          <img key={idx} className="flex flex-row" src={card} alt="card" fill="white" />
        ))}
        </div>
      )
    } else { //Displaying players, if no cards show tombstone image
      
      return (
        <img className="imgCard" src={tombstone} alt="dead" />
      )
    }
  }

  return (
    <div className="flex flex-row min-h-8">
      <p className="textPName w-24 text-right">{item}</p>
      {displayCards(count,context)}    
    </div>
  );
};

export default CardItem;
