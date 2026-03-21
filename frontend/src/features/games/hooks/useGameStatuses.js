import { useQuery } from "@tanstack/react-query";
import { fetchGameStatuses } from "../api/getGameStatuses";

export function useGameStatuses() {
  return useQuery({
    queryKey: ["game_statuses"],
    queryFn: fetchGameStatuses
  });
}