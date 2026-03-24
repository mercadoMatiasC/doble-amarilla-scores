import { API_URL } from "../../../constants/api";

export async function fetchTournamentLogos() {
  const res = await fetch(`${API_URL}/torneos/logos`);
  const data = await res.json();

  return data.tournament_logo_routes;
}