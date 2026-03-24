import { API_URL } from "../../../constants/api";

export async function fetchGame(id) {
  const res = await fetch(`${API_URL}/partidos/${id}`);
  const data = await res.json();

  return data.data;
}