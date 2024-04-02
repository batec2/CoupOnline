import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ActionTable from "@/components/actionTable/actionTable.component";
import GameRules from "@/components/gameRules/gameRules.component";
import GameSectionTitle from "@/components/text/gameSectionTitle.component";
import { Button } from "@/components/ui/button";
import useGameContext from "@/context/useGameContext";

// const References = () => {
//   const { socket, roomId } = useGameContext();
//   return (
//     <div className="flex flex-col space-y-2">
//       <GameSectionTitle text={"References:"} />
//       <TooltipProvider>
//         <Tooltip>
//           <TooltipTrigger className="border bg-secondary rounded-md hover:bg-hover">
//             Actions
//           </TooltipTrigger>
//           <TooltipContent>
//             <ActionTable />
//           </TooltipContent>
//         </Tooltip>
//       </TooltipProvider>
//       <TooltipProvider>
//         <Tooltip>
//           <TooltipTrigger className="border bg-secondary rounded-md hover:bg-hover">
//             Rules
//           </TooltipTrigger>
//           <TooltipContent>
//             <GameRules />
//           </TooltipContent>
//         </Tooltip>
//       </TooltipProvider>
//       <Button
//         onClick={() => {
//           socket.current.emit("reset-game", { roomId: roomId }, () => {
//             console.log("reset");
//           });
//         }}
//       >
//         Reset Game
//       </Button>
//     </div>
//   );
// };

const References = () => {
  const { socket, roomId } = useGameContext();
  return (
    <div className="space-y-2 p-2">
      <GameSectionTitle text={"References:"} />
      <div className="flex flex-row justify-center">
        <div className="flex flex-col space-y-2 w-60 m-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-button-mainButton text-textColor-dark">
                Actions
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-full w-fit">
              <ActionTable />
            </DialogContent>
          </Dialog>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-button-mainButton text-textColor-dark">
                Rules
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-full w-fit max-h-full">
              <GameRules />
            </DialogContent>
          </Dialog>
          <Button
            className="bg-button-secondaryButton text-textColor-dark"
            onClick={() => {
              socket.current.emit("reset-game", { roomId: roomId }, () => {
                console.log("reset");
              });
            }}
          >
            Reset Game
          </Button>
        </div>
      </div>
    </div>
  );
};

export default References;
