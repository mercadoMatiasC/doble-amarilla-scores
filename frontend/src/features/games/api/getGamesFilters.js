const API_URL = "http://192.168.100.228:8000/api/partidos/filtros";

export async function fetchGamesFilters() {
  const res = await fetch(API_URL);
  const data = await res.json();

  return data;
}