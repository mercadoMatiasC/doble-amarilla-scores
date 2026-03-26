import { API_URL } from "../../../constants/api";

export async function storeTournament(data) {
  const formData = new FormData();

  Object.keys(data).forEach(key => {
    let value = data[key];

    if (key === "online_status") 
      value = value ? "1" : "0";

    if (value !== null && value !== undefined)
      formData.append(key, value);
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