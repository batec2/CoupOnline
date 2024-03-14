import { Button } from "@/components/ui/button";
import { useContext } from "react";
import SocketContext from "@/context/socketContext";
import {
  handleSteal,
  handleAid,
  handleAssassinate,
  handleCoup,
  handleSwap,
  handleIncome,
  handleTaxes,
} from "../../actions/socketActions";
/**
 * Page for playing game and interacting with game state
 * @returns Game Page
 */
const GamePage = () => {
  const socket = useContext(SocketContext);

  return (
    <div>
      <h1>Game Page</h1>
      <div>
        <Button onClick={() => handleIncome(socket)}>Income</Button>
        <Button onClick={() => handleAid(socket)}>Foreign Aid</Button>
        <Button onClick={() => handleCoup(socket)}>Coup</Button>
        <Button onClick={() => handleTaxes(socket)}>Taxes</Button>
        <Button onClick={() => handleAssassinate(socket)}>Assassinate</Button>
        <Button onClick={() => handleSteal(socket)}>Steal</Button>
        <Button onClick={() => handleSwap(socket)}>Swap Influence</Button>
      </div>
    </div>
  );
};

export default GamePage;
