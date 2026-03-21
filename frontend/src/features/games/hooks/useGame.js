import { useQuery } from "@tanstack/react-query";
import { fetchGame } from "../api/getGame";

export function useGame(id) {
  return useQuery({
    queryKey: ["game", id],
    queryFn: () => fetchGame(id),
    enabled: !!id
  });
}