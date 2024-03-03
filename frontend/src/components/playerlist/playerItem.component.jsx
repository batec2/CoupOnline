import React from "react"
import card from './card32.png'
import tombstone from './tombstone32.png'

import './playerList.styles.css'

/**
 * Player Overview for list of players
 * @param {String} player Player object, containing player name and number of cards 
 * @returns PlayerItem React component
 */
const PlayerItem = ({ player }) => {
  if (player.cards == 2) {
    return(
      <div className="playerItem">
        <text className="textPName">{player.name}</text>
        <img className="imgCard" src={card} alt="card" />
        <img className="imgCard" src={card} alt="card" />
      </div>
    )
  } else if (player.cards == 1) {
    return(
      <div className="playerItem">
        <text className="textPName">{player.name}</text>
        <img className="imgCard" src={card} alt="card" />
      </div>
    )
  } else {
    return(
      <div className="playerItem">
        <text className="textPName">{player.name}</text>
        <img className="imgCard" src={tombstone} alt="dead" />
      </div>
    )
  }
}
  

export default PlayerItem;