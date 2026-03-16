import { useQuery } from "@tanstack/react-query";
import { fetchLiveGames } from "../api/getLiveGames";

export function useLiveGames(isLiveActive = true) {
  return useQuery({
    queryKey: ["games", "live"],
    queryFn: () => fetchLiveGames(),
    
    // -- REFETCHING --
    refetchInterval: isLiveActive ? 8000 : false,
    refetchIntervalInBackground: true,
    refetchOnWindowFocus: true,
    staleTime: 0,
  });
}