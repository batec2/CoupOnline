import card from "./card32.png";
import tombstone from "./tombstone32.png";

/**
 * Player Overview for list of players
 * @param {String} player Player object, containing player name and number of cards
 * @returns PlayerItem React component
 */
const CardItem = ({ item, count, context }) => {
  if (count > 0) {
    return (
      <div className="grid grid-cols-5">
        <p className="text-right col-span-3">{item}</p>
        {Array.from({ length: count }, (e) => (
          <img key={e} className="flex flex-row" src={card} alt="card" />
        ))}
      </div>
    );
  } else if (context == "players") {
    return (
      <div className="flex flex-row">
        <p className="textPName">{item}</p>
        <img className="imgCard" src={tombstone} alt="dead" />
      </div>
    );
  } else {
    return;
  }
};

export default CardItem;
