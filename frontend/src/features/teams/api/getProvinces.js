import { API_URL } from "../../../constants/api";

export async function fetchProvinces() {
  const res = await fetch(`${API_URL}/equipos/provincias`);
  const data = await res.json();

  return data.provinces;
}