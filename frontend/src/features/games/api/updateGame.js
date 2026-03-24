import { API_URL } from "../../../constants/api";

export async function updateGame(id, data) {
  const res = await fetch(`${API_URL}/partidos/${id}`, {
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