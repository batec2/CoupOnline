import "./App.css";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import RoomPage from "./pages/room/room.page";
import GamePage from "./pages/game/game.page";
import StatsPage from "./pages/stats/stats.page";
import ProfilePage from "./pages/profile/profile.page";
import LoginPage from "./pages/login/login.page";
import CreationPage from "./pages/creation/creation.page.jsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  },
});

function App() {


  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="login" element={<LoginPage />}></Route>
          <Route path="creation" element={<CreationPage />}></Route>
          <Route path="room" element={<RoomPage />}></Route>
          <Route path="game" element={<GamePage />}></Route>
          <Route path="stats" element={<StatsPage />}></Route>
          <Route path="profile" element={<ProfilePage />}></Route>
        </Routes>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
