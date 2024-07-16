import { useQuery } from "@tanstack/react-query";
import { getGoals } from "../lib/api";

export const GOALS = "goals";

const useGoals = (opts = {}) => {
  const { data: goals = [], ...rest } = useQuery({
    queryKey: [GOALS],
    queryFn: getGoals,
    ...opts,
  });

  return { goals, ...rest };
};

export default useGoals;
