import { useQuery } from "@tanstack/react-query";
import { fetchTournamentNames } from "../api/getTournamentNames";

export function useTournamentNames() {
  return useQuery({
    queryKey: ["tournament_names"],
    queryFn: fetchTournamentNames
  });
}