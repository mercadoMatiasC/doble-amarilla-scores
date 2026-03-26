import { useQuery } from "@tanstack/react-query";
import { fetchTeams } from "../api/getTeams";
import { useSearchParams } from "react-router-dom";

export function useTeams() {
  const [searchParams] = useSearchParams();

  const filters = {
    search: searchParams.get("search") || "",
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