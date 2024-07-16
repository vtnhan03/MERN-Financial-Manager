import { useQuery } from "@tanstack/react-query";
import { getBudgets } from "../lib/api";

export const BUDGETS = "budgets";

const useBudgets = (opts = {}) => {
  const { data: budgets = [], ...rest } = useQuery({
    queryKey: [BUDGETS],
    queryFn: getBudgets,
    ...opts,
  });

  return { budgets, ...rest };
};

export default useBudgets;
