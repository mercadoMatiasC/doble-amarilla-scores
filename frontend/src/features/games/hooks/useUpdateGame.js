import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateGame } from "../api/updateGame";

export function useUpdateGame() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => updateGame(id, data),

    onMutate: async ({ id, data }) => {
      await queryClient.cancelQueries(["games", id]);
      const previousGame = queryClient.getQueryData(["games", id]);

      queryClient.setQueryData(["games", id], old => ({
        ...old,
        ...data
      }));

      queryClient.setQueryData(["games"], old => { //UPDATE LIST
        if (!old?.data) 
            return old;

        return {
          ...old,
          data: old.data.map(g =>
            g.id === id ? { ...g, ...data } : g
          )
        };
      });

      return { previousGame };
    },

    onError: (err, variables, context) => {
      const { id } = variables;
      queryClient.setQueryData(["games", id], context.previousGame);
    },

    onSettled: (data, error, variables) => {
      const { id } = variables;

      queryClient.invalidateQueries(["games"]);
      queryClient.invalidateQueries(["games", id]);
    },

    onSuccess: () => {
      console.log('Update successful.');
    }
  });
}