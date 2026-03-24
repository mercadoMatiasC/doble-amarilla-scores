import { useQuery } from "@tanstack/react-query";
import { fetchTeamLogos } from "../api/getTeamLogos";

export function useTeamLogos() {
  return useQuery({
    queryKey: ["team_logos"],
    queryFn: fetchTeamLogos
  });
}