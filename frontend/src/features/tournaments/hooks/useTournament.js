import { useQuery } from "@tanstack/react-query";
import { fetchTournament } from "../api/getTournament";

export function useTournament(id) {
  return useQuery({
    queryKey: ["tournament", id],
    queryFn: () => fetchTournament(id),
    enabled: !!id
  });
}