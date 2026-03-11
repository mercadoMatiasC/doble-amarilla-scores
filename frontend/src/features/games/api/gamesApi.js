const API_URL = "http://192.168.100.228:8000/api/partidos";

export async function fetchGames() {
  const res = await fetch(API_URL);
  const data = await res.json();

  return data.data;
}