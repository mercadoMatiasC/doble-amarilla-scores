import { API_URL } from "../../../constants/api";

export async function fetchGameStatuses() {
  const res = await fetch(`${API_URL}/partidos/estados`);
  const data = await res.json();

  return data.match_statuses;
}