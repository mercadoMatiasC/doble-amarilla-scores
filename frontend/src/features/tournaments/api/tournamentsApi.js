const API_URL = "http://192.168.100.228:8000/api/torneos";

export async function fetchTournaments() {
  const res = await fetch(API_URL);
  const data = await res.json();

  return data.data;
}