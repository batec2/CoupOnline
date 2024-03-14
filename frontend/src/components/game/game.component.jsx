import {
  handleSteal,
  handleAid,
  handleAssassinate,
  handleCoup,
  handleSwap,
  handleIncome,
  handleTaxes,
} from "../../actions/socketActions";

import { Button } from "../ui/button";

const GameComponent = ({ socket }) => {
  return (
    <div>
      <h1>Gamee</h1>
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

export default GameComponent;
