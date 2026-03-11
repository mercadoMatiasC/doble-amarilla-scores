import { useQuery } from "@tanstack/react-query";
import { fetchTournaments } from "../api/tournamentsApi";

export function useTournaments() {
  return useQuery({
    queryKey: ["tournaments"],
    queryFn: fetchTournaments
  });
}