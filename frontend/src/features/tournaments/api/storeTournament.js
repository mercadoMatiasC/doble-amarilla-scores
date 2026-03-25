import { API_URL } from "../../../constants/api";

export async function storeTournament(data) {
  const formData = new FormData();

  Object.keys(data).forEach(key => {
    if (data[key] !== null && data[key] !== undefined)
      formData.append(key, data[key]);
  });
  
  const res = await fetch(`${API_URL}/torneos`, {
    method: "POST",
    body: formData, 
  });

  const json = await res.json();

  if (!res.ok)
    throw json;

  return json;
}