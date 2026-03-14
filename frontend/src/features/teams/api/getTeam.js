const API_URL = "http://192.168.100.228:8000/api/equipos";

export async function fetchTeam(id) {
  const res = await fetch(`${API_URL}/${id}`);
  const data = await res.json();

  return data.data;
}