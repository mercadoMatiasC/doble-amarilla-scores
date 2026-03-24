import { API_URL } from "../../../constants/api";

export async function fetchTeams() {
  const res = await fetch(`${API_URL}/equipos`);
  const data = await res.json();

  return data.data;
}