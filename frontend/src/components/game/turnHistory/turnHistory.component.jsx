import GameSectionTitle from "@/components/text/gameSectionTitle.component"
import useGameContext from "@/context/useGameContext.js";

const TurnHistory = () => {
  const { eventLog } = useGameContext();

  return (
    <div className="p-1">
      <GameSectionTitle text ={"Recent Turn History:"} />
      {eventLog.map((entry, idx) => 
        <h1 key={idx}>{entry}</h1> )}
    </div>
  )
}

export default TurnHistory;