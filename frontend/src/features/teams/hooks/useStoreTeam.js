import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { storeTeam } from "../api/storeTeam.js";

export function useStoreTeam() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: ({ data }) => storeTeam(data),
    
    onSuccess: (response) => {
      const newTeamId = response.data?.id;

      if (newTeamId) {
        queryClient.invalidateQueries({ queryKey: ["teams"] });
        console.log('Successfully created team ID:', newTeamId);

        navigate(`/equipos/${newTeamId}`); 
      } else 
        console.error("Could not find ID in response. Full response:", response);
    }
  });
}