import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./layout/Layout";
import { TeamsIndex } from "./features/teams/pages/TeamsIndex"
import { TeamsShow }  from "./features/teams/pages/TeamsShow"
import { TournamentsIndex } from "./features/tournaments/pages/TournamentsIndex"
import { TournamentsShow }  from "./features/tournaments/pages/TournamentsShow"
import { GamesIndex } from "./features/games/pages/GamesIndex"
import { GamesShow }  from "./features/games/pages/GamesShow"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<GamesIndex />} />
          <Route path="/equipos"  element={<TeamsIndex />} />
          <Route path="/torneos"  element={<TournamentsIndex />} />
          <Route path="/partidos" element={<GamesIndex />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}