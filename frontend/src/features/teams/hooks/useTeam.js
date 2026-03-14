import { useQuery } from "@tanstack/react-query";
import { fetchTeam } from "../api/getTeam";

export function useTeam(id) {
  return useQuery({
    queryKey: ["team", id],
    queryFn: () => fetchTeam(id),
    enabled: !!id
  });
}