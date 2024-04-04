import GameSectionTitle from "@/components/text/gameSectionTitle.component"
import useGameContext from "@/context/useGameContext.js";
import terminal from "virtual:terminal"

const TurnHistory = () => {
  const { eventLog } = useGameContext();
  terminal.log(eventLog)
  eventLog.map((entry) => {
    terminal.log(entry)
  })
  return (
    <div className="p-1">
    {/* <GameSectionTitle text ={"Interesting Cat Facts:"} />
    <p>Cats have an extra organ which allow them to taste scents in the air</p>
    <br />
    <p>A house cat's genome is 95.6% tiger</p>
    <br />
    <p>A cat's whiskers are about the same width as its body. Cats also have whiskers on the back of their legs.</p>
    <br />
    <p>Cats can jump up to 6x their length</p>
    <br />
    <p>A cat can sleep 12 to 16 hours a day</p> */}
      <GameSectionTitle text ={"Recent Turn History:"} />
      {eventLog.map((entry, idx) => 
        <h1 key={idx}>{entry}</h1> )}
    </div>
  )
}

export default TurnHistory;