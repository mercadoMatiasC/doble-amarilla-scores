import { API_URL } from "../../../constants/api";

export async function storeTournament(data) {
  const formData = new FormData();

  Object.keys(data).forEach(key => {
    let value = data[key];

    if (key === "logo_file"){
      if (value instanceof File) 
        formData.append("logo_file", value);
      return;
    }

    if (key === "online_status")
      value = value ? "1" : "0";

    if (value === "" || value === null || value === undefined)
      return;

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