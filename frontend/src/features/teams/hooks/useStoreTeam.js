import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { storeTeam } from "../api/storeTeam.js";

export function useStoreTeam() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: ({ data }) => storeTeam(data),
    
    onSuccess: (response) => {
      const new_team_id = response.data?.id;

      if (new_team_id) {
        queryClient.invalidateQueries({ queryKey: ["teams"] });
        console.log('Successfully created team ID:', new_team_id);

        navigate(`/equipos/${new_team_id}`); 
      } else 
        console.error("Could not find ID in response. Full response:", response);
    }
  });
}