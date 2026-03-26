import { API_URL } from "../../../constants/api";

export async function fetchTeams(filters) {
  const queryParams = new URLSearchParams(filters).toString();
  const res = await fetch(`${API_URL}/equipos?${queryParams}`);
  const json = await res.json();

  if (!res.ok) 
    throw json;

  return json;
}