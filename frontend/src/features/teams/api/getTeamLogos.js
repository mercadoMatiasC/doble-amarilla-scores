import { API_URL } from "../../../constants/api";

export async function fetchTeamLogos() {
  const res = await fetch(`${API_URL}/equipos/escudos`);
  const data = await res.json();

  return data.team_logo_routes;
}