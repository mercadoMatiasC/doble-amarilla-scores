import { API_URL } from "../../../constants/api";

export async function fetchGames(filters) {
  const params = new URLSearchParams(filters);
  const res = await fetch(`${API_URL}/partidos/?${params.toString()}`);
  const data = await res.json();

  return data;
}