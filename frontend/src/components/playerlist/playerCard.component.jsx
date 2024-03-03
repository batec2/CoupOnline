import React from "react"
import card from './card32.png'
import tombstone from './tombstone32.png'

import './playerList.styles.css'

/**
 * 
 * @param {String} player Player object, containing player name and number of cards 
 * @returns PlayerCard React component
 */
const PlayerCard = ({ player }) => {
  if (player.cards == 2) {
    return(
      <div className="playerCard">
        <text className="textPName">{player.name}</text>
        <img className="imgCard" src={card} alt="card" />
        <img className="imgCard" src={card} alt="card" />
      </div>
    )
  } else if (player.cards == 1) {
    return(
      <div className="playerCard">
        <text className="textPName">{player.name}</text>
        <img className="imgCard" src={card} alt="card" />
      </div>
    )
  } else {
    return(
      <div className="playerCard">
        <text className="textPName">{player.name}</text>
        <img className="imgCard" src={tombstone} alt="dead" />
      </div>
    )
  }
}
  

export default PlayerCard;