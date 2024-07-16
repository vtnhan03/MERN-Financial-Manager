import { Router } from "express";
import {
  createExpenseHandler,
  deleteExpenseHandler,
  getAlLExpensesHandler,
  getExpensesByBudgetIdHandler,
  updateExpenseHandler,
} from "../controllers/expense.controller";
import { get } from "mongoose";

const expenseRoutes = Router();

expenseRoutes.post("/", createExpenseHandler);
expenseRoutes.get("/", getAlLExpensesHandler);
expenseRoutes.get("/:budgetId", getExpensesByBudgetIdHandler);
expenseRoutes.put("/:id", updateExpenseHandler);
expenseRoutes.delete("/:id", deleteExpenseHandler);

export default expenseRoutes;
