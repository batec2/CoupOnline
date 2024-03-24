import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "../../ui/tooltip"
import ActionTable from "@/components/actionTable/actionTable.component"
import GameRules from "@/components/gameRules/gameRules.component"
import GameSectionTitle from "@/components/text/gameSectionTitle.component"

const References = () => {
  return(
  <div className="flex flex-col space-y-2 ">
    <GameSectionTitle text={"References:"} />
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger className="border mx-2 bg-secondary rounded-md hover:bg-hover">
          Actions
        </TooltipTrigger>
        <TooltipContent>
          <ActionTable />
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger className="border mx-2 bg-secondary rounded-md hover:bg-hover">
          Rules
        </TooltipTrigger>
        <TooltipContent>
          <GameRules />
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>

  </div>
  )
}

export default References