import { useQuery } from "@tanstack/react-query";
import { fetchTeamData } from "../api/getTeamData";

export function useTeamData(id) {
  return useQuery({
    queryKey: ["team_data", id],
    queryFn: () => fetchTeamData(id), 
    staleTime: Infinity
  });
}