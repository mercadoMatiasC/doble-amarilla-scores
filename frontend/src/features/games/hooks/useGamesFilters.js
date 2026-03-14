import { useQuery } from "@tanstack/react-query";
import { fetchGamesFilters } from '../api/getGamesFilters'

export function useGamesFilters() {
  return useQuery({
    queryKey: ["filters"],
    queryFn: fetchGamesFilters,
    staleTime: Infinity
  });
}