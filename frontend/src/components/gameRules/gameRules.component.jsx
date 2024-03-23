const GameRules = () => {
  return (
    <div>
      <p className="text-xl font-bold">Game Rules</p>
      <p className="text-lg font-semibold">Objective</p>
      <p>Eliminate all other players by reducing their influence (number of
        cards) to zero 
      </p>
      <p className="text-lg font-semibold">Setup</p>
      <p>Each player starts with two cards and two coins. </p>
      <p className="text-lg font-semibold">Gameplay</p>
      <p>On their turn, players choose one action to declare</p>
      <p>- Default actions (require no influence cards) are black</p>
      <p>- Character actions the player has the card to support are green</p>
      <p>- Character actions the player must bluff to declare are red</p>
      <p>- Unavailable actions are grey</p>
      <p>All opponents have a chance to challenge or block the action</p>
      <p>Any action or counteraction requiring a character card may be challenged</p>
      <p>When a challenge is issued, the player who declared the 
        original action/counteraction must reveal a card.</p>
      <p>- If the card revealed supports the action, the challenger loses 1 influence.</p>
      <p>- If the card does not support the action, the player who declared the action loses 1 influence</p>
      <p>- NOTE: It is possible to lose 2 influence at once, if bluffing the Contessa and challenged</p>
      <p>If a player begins their turn with 10 or more coins, they must perform 
        a Coup</p>
      <p>See actions for a detailed list of actions and counteractions</p>
    </div>
  )
}

export default GameRules;

