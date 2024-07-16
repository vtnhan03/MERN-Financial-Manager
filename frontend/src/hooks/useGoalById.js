import { useQuery } from "@tanstack/react-query";
import { getGoalById } from "../lib/api";

export const GOAL = "GOAL";

const useGoalById = (goalId, opts = {}) => {
  const { data: goal = [], ...rest } = useQuery({
    queryKey: [GOAL, goalId],
    queryFn: () => getGoalById(goalId),
    ...opts,
  });
  return { goal, ...rest };
};

export default useGoalById;
