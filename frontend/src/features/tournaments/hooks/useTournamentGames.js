import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchGames } from "../../games/api/getGames";

export function useTournamentGames(id) {
  const [searchParams] = useSearchParams();

  const filters = {
    tournament_id: id,
    sort: "-match_day",
    page: searchParams.get("page") || 1
  };

  const cleanFilters = Object.fromEntries(
    Object.entries(filters).filter(([_, v]) => v !== "")
  );
  
  return useQuery({
    queryKey: ["games", cleanFilters],
    queryFn: () => fetchGames(cleanFilters)
  });
}