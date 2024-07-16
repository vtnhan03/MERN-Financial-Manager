import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBudget } from "../lib/api";
import { BUDGETS } from "./useBudget";

const useDeleteBudget = (budgetId) => {
  const queryClient = useQueryClient();
  const { mutate, ...rest } = useMutation({
    mutationFn: (budgetId) => deleteBudget(budgetId),
    onSuccess: () => {
      queryClient.setQueryData([BUDGETS], (cache) =>
        cache.filter((budget) => budget._id !== budgetId)
      );
    },
  });

  return { deleteBudget: mutate, ...rest };
};

export default useDeleteBudget;
