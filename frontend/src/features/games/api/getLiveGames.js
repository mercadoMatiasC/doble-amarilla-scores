import { API_URL } from "../../../constants/api";

export async function fetchLiveGames() {
    const res = await fetch(`${API_URL}/partidos/vivo`);
    const data = await res.json();

    return data;
}