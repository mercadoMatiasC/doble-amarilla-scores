import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { storeGame } from "../api/storeGame.js";

export function useStoreGame() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: ({ data }) => storeGame(data),
    
    onSuccess: (response) => {
      const new_game_id = response.data?.id;

      if (new_game_id) {
        queryClient.invalidateQueries({ queryKey: ["games"] });
        console.log('Successfully created game ID:', new_game_id);

        navigate(`/partidos/${new_game_id}`); 
      } else 
        console.error("Could not find ID in response. Full response:", response);
    }
  });
}