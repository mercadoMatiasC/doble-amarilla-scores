const API_URL = "http://192.168.100.228:8000/api/equipos";

export async function fetchTeamData(id) {
  const res = await fetch(`${API_URL}/${id}/informacion`);
  const data = await res.json();

  return data.data;
}