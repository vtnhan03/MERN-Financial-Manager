import API from "../config/apiClient";

export const register = async (data) => API.post("/auth/register", data);
export const login = async (data) => API.post("/auth/login", data);
export const logout = async () => API.get("/auth/logout");
export const verifyEmail = async (verificationCode) =>
  API.get(`/auth/email/verify/${verificationCode}`);
export const sendPasswordResetEmail = async (email) =>
  API.post("/auth/password/forgot", { email });
export const resetPassword = async ({ verificationCode, password }) =>
  API.post("/auth/password/reset", { verificationCode, password });

export const createBudget = async (data) => API.post("/budgets", data);
export const createGoal = async (data) => API.post("/goals", data);
export const createExpense = async (data) => API.post("/expenses", data);
export const createTransaction = async (data) =>
  API.post("/transactions", data);
export const getBudgets = async () => API.get("/budgets");
export const getBudgetById = async (id) => API.get(`/budgets/${id}`);
export const getCategories = async () => API.get("/categories");
export const getGoals = async () => API.get("/goals");
export const getGoalById = async (id) => API.get(`/goals/${id}`);
export const getUser = async () => API.get("/user");
export const getSessions = async () => API.get("/sessions");
export const getTransactionByGoal = async (id) =>
  API.get(`/transactions/${id}`);
export const getCategoryById = async (id) => API.get(`/categories/${id}`);
export const getExpensesByBudget = async (id) => API.get(`/expenses/${id}`);
export const updateBudget = async (budget) => {
  const { id, ...budgetData } = budget;
  return API.put(`/budgets/${id}`, budgetData);
};
export const updateGoal = async (goal) => {
  const { id, ...goalData } = goal;
  return API.put(`/goals/${id}`, goalData);
};
export const deleteSession = async (id) => API.delete(`/sessions/${id}`);
export const deleteBudget = async (id) => API.delete(`/budgets/${id}`);
export const deleteGoal = async (id) => API.delete(`/goals/${id}`);
