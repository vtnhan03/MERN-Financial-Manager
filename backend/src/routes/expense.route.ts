import { Router } from "express";
import { getExpensesHandler } from "../controllers/expense.controller";

const expenseRoutes = Router();

expenseRoutes.get("/", getExpensesHandler);
// expenseRoutes.post('/', createExpenseHandler);
// expenseRoutes.put('/:id', updateExpenseHandler);
// expenseRoutes.delete('/:id', deleteExpenseHandler);

export default expenseRoutes;
