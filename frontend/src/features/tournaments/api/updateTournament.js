import { API_URL } from "../../../constants/api";

export async function updateTournament(id, data) {
  const res = await fetch(`${API_URL}/torneos/${id}`, {
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