import { API_URL } from "../../../constants/api";

export async function fetchTeam(id) {
  const res = await fetch(`${API_URL}/equipos/${id}`);
  const data = await res.json();

  return data.data;
}