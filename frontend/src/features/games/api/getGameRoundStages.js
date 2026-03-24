import { API_URL } from "../../../constants/api";

export async function fetchGameRoundStages() {
  const res = await fetch(`${API_URL}/partidos/fases`);
  const data = await res.json();

  return data.match_round_stages;
}