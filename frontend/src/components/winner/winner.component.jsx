import useGameContext from "@/context/useGameContext";

const Winner = () => {
  console.log(useGameContext());
  const { winner, socket } = useGameContext();

  if (socket.id === winner) {
    return (
      <div>
        <h1>YOU WIN</h1>
      </div>
    );
  }
  return (
    <div>
      <h1>Someone else won you are loser!</h1>
    </div>
  );
};

export default Winner;
