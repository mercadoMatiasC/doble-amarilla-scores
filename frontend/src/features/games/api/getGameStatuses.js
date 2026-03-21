const API_URL = "http://192.168.100.228:8000/api/partidos/estados";

export async function fetchGameStatuses() {
  const res = await fetch(API_URL);
  const data = await res.json();

  return data.match_statuses;
}