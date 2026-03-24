import { useQuery } from "@tanstack/react-query";
import { fetchTournamentLogos } from "../api/getTournamentLogos";

export function useTournamentLogos() {
  return useQuery({
    queryKey: ["tournamentlogos"],
    queryFn: fetchTournamentLogos
  });
}