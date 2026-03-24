import { useQuery } from "@tanstack/react-query";
import { fetchTournamentStatuses } from "../api/getTournamentStatuses";

export function useTournamentStatuses() {
  return useQuery({
    queryKey: ["tournament_statuses"],
    queryFn: fetchTournamentStatuses
  });
}