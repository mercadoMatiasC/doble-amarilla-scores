const API_URL = "http://192.168.100.228:8000/api/partidos";

export async function fetchGame(id) {
  const res = await fetch(`${API_URL}/${id}`);
  const data = await res.json();

  return data.data;
}