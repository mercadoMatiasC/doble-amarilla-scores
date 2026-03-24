import { API_URL } from "../../../constants/api";

export async function fetchGamesFilters() {
  const res = await fetch(`${API_URL}/partidos/filtros`);
  const data = await res.json();

  return data;
}