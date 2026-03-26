import { useQuery } from "@tanstack/react-query";
import { fetchTournaments } from "../api/getTournaments";
import { useSearchParams } from "react-router-dom";

export function useTournaments() {
  const [searchParams] = useSearchParams();

  const filters = {
    search: searchParams.get("search") || "",
    page: searchParams.get("page") || 1
  };

  const cleanFilters = Object.fromEntries(
    Object.entries(filters).filter(([_, v]) => v !== "")
  );
 
  return useQuery({
    queryKey: ["tournaments", cleanFilters],
    queryFn: () => fetchTournaments(cleanFilters)
  });
}