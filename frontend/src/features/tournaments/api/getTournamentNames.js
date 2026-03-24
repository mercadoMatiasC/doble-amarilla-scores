import { API_URL } from "../../../constants/api";

export async function fetchTournamentNames() {
  const res = await fetch(`${API_URL}/torneos/nombres`);
  const data = await res.json();

  return data.tournament_names;
}