import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../lib/api";

export const CATEGORIES = "categories";

const useCategories = (opts = {}) => {
  const { data: categories = [], ...rest } = useQuery({
    queryKey: [CATEGORIES],
    queryFn: getCategories,
    ...opts,
  });

  return { categories, ...rest };
};

export default useCategories;
