import React from "react"
import PlayerItem from "./playerItem.component";

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
        <PlayerItem player={player} /> 
      ))}
    </div>
  )
}

export default PlayerList;