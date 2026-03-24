import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTeam } from "../api/updateTeam.js";

export function useUpdateTeam() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => updateTeam(id, data),

    onMutate: async ({ id, data }) => {
      await queryClient.cancelQueries(["teams", id]);
      const previousTeam = queryClient.getQueryData(["teams", id]);

      queryClient.setQueryData(["teams", id], old => ({
        ...old,
        ...data
      }));

      queryClient.setQueryData(["teams"], old => { //UPDATE LIST
        if (!old?.data) 
            return old;

        return {
          ...old,
          data: old.data.map(g =>
            g.id === id ? { ...g, ...data } : g
          )
        };
      });

      return { previousTeam };
    },

    onError: (err, variables, context) => {
      const { id } = variables;
      queryClient.setQueryData(["teams", id], context.previousTeam);
    },

    onSettled: (data, error, variables) => {
      const { id } = variables;

      queryClient.invalidateQueries(["teams"]);
      queryClient.invalidateQueries(["team", id]);
    },

    onSuccess: () => {
      console.log('Update successful.');
    }
  });
}