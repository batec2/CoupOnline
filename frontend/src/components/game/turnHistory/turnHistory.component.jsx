import GameSectionTitle from "@/components/text/gameSectionTitle.component"

const TurnHistory = () => {

  return (
    <div className="p-1">
    <GameSectionTitle text ={"Interesting Cat Facts:"} />
    <p>Cats have an extra organ which allow the to taste scents in the air</p>
    <br />
    <p>A house cat's genome is 95.6% tiger</p>
    <br />
    <p>A cat's whiskers are about the same width as its body. Cats also have whiskers on the back of their legs.</p>
    <br />
    <p>Cats can jump up to 6x their length</p>
    <br />
    <p>A cat can sleep 12 to 16 hours a day</p>
    {/* <GameSectionTitle text ={"Recent Turn History:"} />
    <h1>TODO</h1> */}
    </div>
  )
}

export default TurnHistory;