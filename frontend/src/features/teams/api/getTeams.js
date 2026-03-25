import { API_URL } from "../../../constants/api";

export async function fetchTeams(filters) {
  const params = new URLSearchParams(filters);
  const res = await fetch(`${API_URL}/equipos?${params.toString()}`);
  const data = await res.json();

  return data;
}