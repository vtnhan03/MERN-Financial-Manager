import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteGoal } from "../lib/api";
import { GOALS } from "./useGoal";

const useDeleteGoal = (goalId) => {
  const queryClient = useQueryClient();
  const { mutate, ...rest } = useMutation({
    mutationFn: (goalId) => deleteGoal(goalId),
    onSuccess: () => {
      queryClient.setQueryData([GOALS], (cache) =>
        cache.filter((goal) => goal._id !== goalId)
      );
    },
  });

  return { deleteGoal: mutate, ...rest };
};

export default useDeleteGoal;
