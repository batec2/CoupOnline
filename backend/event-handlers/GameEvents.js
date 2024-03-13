export const registerGameHandlers = (io, socket) => {
  socket.on("Assassinate", () => {
    console.log("Assassinate");
  });
  socket.on("Steal", () => {
    console.log("Steal");
  });
  socket.on("Coup", () => {
    console.log("Coup");
  });
  socket.on("Swap", () => {
    console.log("Swap");
  });
  socket.on("Aid", () => {
    console.log("Aid");
  });
  socket.on("Income", () => {
    console.log("Income");
  });
  socket.on("Taxes", () => {
    console.log("Taxes");
  });
};
