import { API_URL } from "../../../constants/api";

export async function fetchTeamData(id) {
  const res = await fetch(`${API_URL}/equipos/${id}/informacion`);
  const data = await res.json();

  return data.data;
}