import { API_URL } from "../../../constants/api";

export async function fetchTournaments() {
  const res = await fetch(`${API_URL}/torneos/`);
  const data = await res.json();

  return data.data;
}