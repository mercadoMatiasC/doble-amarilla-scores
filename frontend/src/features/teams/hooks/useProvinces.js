import { useQuery } from "@tanstack/react-query";
import { fetchProvinces } from "../api/getProvinces";

export function useProvinces() {
  return useQuery({
    queryKey: ["provinces"],
    queryFn: fetchProvinces
  });
}