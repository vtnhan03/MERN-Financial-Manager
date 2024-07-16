import { useQuery } from "@tanstack/react-query";
import { getCategoryById } from "../lib/api";

export const CATEGORY = "category";

const useCategoryById = (categoryId, opts = {}) => {
  const { data: category = {}, ...rest } = useQuery({
    queryKey: [CATEGORY, categoryId],
    queryFn: () => getCategoryById(categoryId),
    enabled: !!categoryId,
    ...opts,
  });

  return { category, ...rest };
};

export default useCategoryById;
