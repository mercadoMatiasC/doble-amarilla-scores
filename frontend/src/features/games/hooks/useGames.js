import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchGames } from "../api/getGames";

export function useGames() {
  const [searchParams] = useSearchParams();

  const filters = {
    team_id: searchParams.get("team_id") || "",
    tournament_id: searchParams.get("tournament_id") || "",
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