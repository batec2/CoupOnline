import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../ui/tooltip";
import ActionTable from "@/components/actionTable/actionTable.component";
import GameRules from "@/components/gameRules/gameRules.component";
import GameSectionTitle from "@/components/text/gameSectionTitle.component";
import { Button } from "@/components/ui/button";
import useGameContext from "@/context/useGameContext";

const References = () => {
  const { socket, roomId } = useGameContext();
  return (
    <div className="flex flex-col space-y-2">
      <GameSectionTitle text={"References:"} />
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger className="border bg-secondary rounded-md hover:bg-hover">
            Actions
          </TooltipTrigger>
          <TooltipContent>
            <ActionTable />
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger className="border bg-secondary rounded-md hover:bg-hover">
            Rules
          </TooltipTrigger>
          <TooltipContent>
            <GameRules />
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <Button
        onClick={() => {
          socket.emit("reset-game", { roomId: roomId }, () => {
            console.log("reset");
          });
        }}
      >
        Reset Game
      </Button>
    </div>
  );
};

export default References;
