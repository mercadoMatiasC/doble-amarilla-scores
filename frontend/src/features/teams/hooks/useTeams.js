import { useQuery } from "@tanstack/react-query";
import { fetchTeams } from "../api/getTeams";
import { useSearchParams } from "react-router-dom";

export function useTeams() {
  const [searchParams] = useSearchParams();

  const filters = {
    team_id: searchParams.get("team_id") || "",
    tournament_id: searchParams.get("tournament_id") || "",
    sort: searchParams.get("sort") || "-match_day",
    page: searchParams.get("page") || 1
  };

  const cleanFilters = Object.fromEntries(
    Object.entries(filters).filter(([_, v]) => v !== "")
  );
 
  return useQuery({
    queryKey: ["teams", cleanFilters],
    queryFn: () => fetchTeams(cleanFilters)
  });
}