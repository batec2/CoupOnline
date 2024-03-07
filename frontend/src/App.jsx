import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import RoomPage from "./pages/room/room.page";
import GamePage from "./pages/game/game.page";
import StatsPage from "./pages/stats/stats.page";
import ProfilePage from "./pages/profile/profile.page";
import { io } from "socket.io-client";
import SocketContext from "./context/socketContext";
import LoginPage from "./pages/login/login.page";
import CreationPage from "./pages/creation/creation.page.jsx";
import TestPage from "./pages/uiTest/uiTest.page.jsx";
import LobbyPage from "./pages/lobby/lobby.page.jsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  },
});

const Socket = io("http://localhost:8080");

Socket.onAny((event, ...args) => {
  console.log(event, args);
});

function App() {
  // const Socket = io("http://localhost:8080", { autoConnect: false });
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient} contextSharing={true}>
        <SocketContext.Provider value={Socket}>
          <Routes>
            <Route path="login" element={<LoginPage />}></Route>
            <Route path="creation" element={<CreationPage />}></Route>
            <Route path="room" element={<RoomPage />}></Route>
            <Route path="room/:roomId" element={<LobbyPage />}></Route>
            <Route path="game" element={<GamePage />}></Route>
            <Route path="stats" element={<StatsPage />}></Route>
            <Route path="profile" element={<ProfilePage />}></Route>
            <Route path="test" element={<TestPage />} />
          </Routes>
        </SocketContext.Provider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
