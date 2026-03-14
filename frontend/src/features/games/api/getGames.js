const API_URL = "http://192.168.100.228:8000/api/partidos";

export async function fetchGames(filters) {
  const params = new URLSearchParams(filters);
  const res = await fetch(`${API_URL}?${params.toString()}`);
  const data = await res.json();

  return data;
}