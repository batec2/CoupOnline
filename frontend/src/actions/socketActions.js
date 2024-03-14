export const handleSteal = (socket) => {
  socket.emit("Steal");
};

export const handleAssassinate = (socket) => {
  socket.emit("Assassinate");
};

export const handleTaxes = (socket) => {
  socket.emit("Taxes");
};

export const handleCoup = (socket) => {
  socket.emit("Coup");
};

export const handleAid = (socket) => {
  socket.emit("Aid");
};

export const handleIncome = (socket) => {
  socket.emit("Income");
};

export const handleSwap = (socket) => {
  socket.emit("Swap");
};

export const handleStartGame = (socket, roomId) => {
  socket.emit("start-game", { roomId: roomId }, ({ status }) => {
    console.log(status);
  });
};
