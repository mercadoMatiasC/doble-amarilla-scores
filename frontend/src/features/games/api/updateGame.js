const API_URL = "http://192.168.100.228:8000/api/partidos";

export async function updateGame(id, data) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const json = await res.json();

  if (!res.ok) 
    throw json;

  return json;
}