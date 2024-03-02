import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import RoomPage from "./pages/room/room.page";
import GamePage from "./pages/game/game.page";
import StatsPage from "./pages/stats/stats.page";
import ProfilePage from "./pages/profile/profile.page";
import { io } from "socket.io-client";
import SocketContext from "./context/socketContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  },
});

const Socket = io("http://localhost:8080");

Socket.on("Current-Users", (socket) => {
  console.log(socket);
});

Socket.on("give-id", (id) => {
  console.log(id.id);
});

function App() {
  // const Socket = io("http://localhost:8080", { autoConnect: false });
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <SocketContext.Provider value={Socket}>
          <Routes>
            <Route path="/room" element={<RoomPage />}></Route>
            <Route path="/game" element={<GamePage />}></Route>
            <Route path="/stats" element={<StatsPage />}></Route>
            <Route path="/profile" element={<ProfilePage />}></Route>
          </Routes>
        </SocketContext.Provider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
