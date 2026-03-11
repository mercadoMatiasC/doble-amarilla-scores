import { useQuery } from "@tanstack/react-query";
import { fetchTeams } from "../api/teamsApi";

export function useTeams() {
  return useQuery({
    queryKey: ["teams"],
    queryFn: fetchTeams
  });
}