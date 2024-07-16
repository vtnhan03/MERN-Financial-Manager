import { useQuery } from "@tanstack/react-query";
import { getExpensesByBudget } from "../lib/api";

export const EXPENSES = "expenses";

const useExpenses = (budgetId, opts = {}) => {
  const { data: expenses = [], ...rest } = useQuery({
    queryKey: [EXPENSES, budgetId],
    queryFn: () => getExpensesByBudget(budgetId),
    ...opts,
  });

  return { expenses, ...rest };
};

export default useExpenses;
