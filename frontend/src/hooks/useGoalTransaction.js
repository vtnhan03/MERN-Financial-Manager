import { useQuery } from "@tanstack/react-query";
import { getTransactionByGoal } from "../lib/api";

export const TRANSACTIONS_BY_GOAL = "transactionsByGoal";

const useGoalTransaction = (goalId, opts = {}) => {
  const { data: transactions = [], ...rest } = useQuery({
    queryKey: [TRANSACTIONS_BY_GOAL, goalId],
    queryFn: () => getTransactionByGoal(goalId),
    ...opts,
  });

  return { transactions, ...rest };
};

export default useGoalTransaction;
