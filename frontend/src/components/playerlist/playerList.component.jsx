import React from "react"
import PlayerCard from "./playerCard.component";

import './playerList.styles.css'

/**
 * List of players and remaining cards
 * @param {String} placeholder - The placeholder text 
 * @returns Textfield
 */
const PlayerList = ({ playerList }) => {
  return(
    <div className="playerList">
      {playerList.map(player => (
        <PlayerCard player={player}></PlayerCard> 
      ))}
    </div>
  )
}

export default PlayerList;