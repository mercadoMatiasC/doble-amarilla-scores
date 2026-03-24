import { API_URL } from "../../../constants/api";

export async function fetchTournament(id) {
  const res = await fetch(`${API_URL}/torneos/${id}`);
  const data = await res.json();

  return data.data;
}