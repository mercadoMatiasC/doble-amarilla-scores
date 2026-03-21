const API_URL = "http://192.168.100.228:8000/api/partidos/fases";

export async function fetchGameRoundStages() {
  const res = await fetch(API_URL);
  const data = await res.json();

  return data.match_round_stages;
}