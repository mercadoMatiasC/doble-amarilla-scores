import { useQuery } from "@tanstack/react-query";
import { fetchTeams } from "../api/getTeams";

export function useTeams() {
  return useQuery({
    queryKey: ["teams"],
    queryFn: fetchTeams
  });
}