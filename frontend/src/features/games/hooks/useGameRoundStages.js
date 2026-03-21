import { useQuery } from "@tanstack/react-query";
import { fetchGameRoundStages } from "../api/getGameRoundStages";

export function useGameRoundStages() {
  return useQuery({
    queryKey: ["game_round_stages"],
    queryFn: fetchGameRoundStages
  });
}