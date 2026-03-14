import { Routes, Route, useLocation } from "react-router-dom";
import { Layout } from "./layout/Layout";
import { TeamsIndex } from "./features/teams/pages/TeamsIndex"
import { TeamsShow }  from "./features/teams/pages/TeamsShow"
import { TournamentsIndex } from "./features/tournaments/pages/TournamentsIndex"
import { TournamentsShow }  from "./features/tournaments/pages/TournamentsShow"
import { GamesIndex } from "./features/games/pages/GamesIndex"
import { GamesShow }  from "./features/games/pages/GamesShow"
import { AnimatePresence } from "framer-motion";

export default function App() {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      {/* The location and key props are what trigger the animation */}
      <Routes location={location} key={location.pathname}>
        <Route element={<Layout />}>
          <Route path="/" element={<GamesIndex />} />

          <Route path="/equipos">
            <Route index element={<TeamsIndex />} />
            <Route path=":id" element={<TeamsShow />} />            
          </Route>

          <Route path="/torneos" element={<TournamentsIndex />} />

          <Route path="/partidos" element={<GamesIndex />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}