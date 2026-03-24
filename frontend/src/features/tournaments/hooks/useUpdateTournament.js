import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTournament } from "../api/updateTournament.js";

export function useUpdateTournament() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => updateTournament(id, data),

    onMutate: async ({ id, data }) => {
      await queryClient.cancelQueries(["tournaments", id]);
      const previousTournament = queryClient.getQueryData(["tournaments", id]);

      queryClient.setQueryData(["tournaments", id], old => ({
        ...old,
        ...data
      }));

      queryClient.setQueryData(["tournaments"], old => { //UPDATE LIST
        if (!old?.data) 
            return old;

        return {
          ...old,
          data: old.data.map(g =>
            g.id === id ? { ...g, ...data } : g
          )
        };
      });

      return { previousTournament };
    },

    onError: (err, variables, context) => {
      const { id } = variables;
      queryClient.setQueryData(["tournaments", id], context.previousTournament);
    },

    onSettled: (data, error, variables) => {
      const { id } = variables;

      queryClient.invalidateQueries(["tournaments"]);
      queryClient.invalidateQueries(["tournaments", id]);
    },

    onSuccess: () => {
      console.log('Update successful.');
    }
  });
}