import { useQuery } from "@tanstack/react-query";
import { getBudgetById } from "../lib/api";

export const BUDGET = "BUDGET";

const useBudgetById = (budgetId, opts = {}) => {
  const { data: budget = [], ...rest } = useQuery({
    queryKey: [BUDGET, budgetId],
    queryFn: () => getBudgetById(budgetId),
    ...opts,
  });
  return { budget, ...rest };
};

export default useBudgetById;
