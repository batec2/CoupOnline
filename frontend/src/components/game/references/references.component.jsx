import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "../../ui/tooltip"
import ActionTable from "@/components/actionTable/actionTable.component"
import GameRules from "@/components/gameRules/gameRules.component"

const References = () => {
  return(
  <div className="flex flex-col">
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>Actions</TooltipTrigger>
        <TooltipContent>
          <ActionTable />
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>Rules</TooltipTrigger>
        <TooltipContent>
          <GameRules />
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>

  </div>
  )
}

export default References