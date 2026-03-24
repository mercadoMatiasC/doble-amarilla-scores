import { API_URL } from "../../../constants/api";

export async function fetchTournamentStatuses() {
  const res = await fetch(`${API_URL}/torneos/estados`);
  const data = await res.json();

  return data.tournament_statuses;
}