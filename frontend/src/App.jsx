import { Layout } from "./layout/Layout";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import { TeamsIndex } from "./features/teams/pages/TeamsIndex";
import { TeamCreate } from "./features/teams/pages/TeamCreate";
import { TeamsShow  } from "./features/teams/pages/TeamsShow";

import { TournamentsIndex } from "./features/tournaments/pages/TournamentsIndex";
import { TournamentCreate } from "./features/tournaments/pages/TournamentCreate";
import { TournamentsShow  } from "./features/tournaments/pages/TournamentsShow"

import { GamesIndex } from "./features/games/pages/GamesIndex";
import { GameCreate } from "./features/games/pages/GameCreate";
import { GameEdit   } from "./features/games/pages/GameEdit";

export default function App() {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      {/* The location and key props are what trigger the animation */}
      <Routes location={location} key={location.pathname}>
        <Route element={<Layout />}>
          <Route path="/" element={<GamesIndex />} />

          {/* -- TEAMS -- */}
          <Route path="/equipos">
            <Route index element={<TeamsIndex />} />
            <Route path="registrar" element={<TeamCreate />} />
            <Route path=":id" element={<TeamsShow />} />            
          </Route>

          {/* -- TOURNAMENTS -- */}
          <Route path="/torneos">
            <Route index element={<TournamentsIndex />} />
            <Route path="registrar" element={<TournamentCreate />} />
            <Route path=":id" element={<TournamentsShow />} />            
          </Route>

          {/* -- GAMES -- */}
          <Route path="/partidos">
            <Route index element={<GamesIndex />} />
            <Route path="registrar" element={<GameCreate />} />
            <Route path=":id" element={<GameEdit />} />            
          </Route>
        </Route>
      </Routes>
    </AnimatePresence>
  );
}