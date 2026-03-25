import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { storeTournament } from "../api/storeTournament.js";

export function useStoreTournament() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: ({ data }) => storeTournament(data),
    
    onSuccess: (response) => {
      const new_tournament_id = response.data?.id;

      if (new_tournament_id) {
        queryClient.invalidateQueries({ queryKey: ["tournaments"] });
        console.log('Successfully created tournament ID:', new_tournament_id);

        navigate(`/torneos/${new_tournament_id}`); 
      } else 
        console.error("Could not find ID in response. Full response: ", response);
    },

    onError: (data) => {
      console.log(data);
    }
  });
}