import { Router } from "express";
import {
  createBudgetHandler,
  deleteBudgetHandler,
  getBudgetsHandler,
  updateBudgetHandler,
} from "../controllers/budget.controller";

const budgetRoutes = Router();

budgetRoutes.get("/", getBudgetsHandler);
budgetRoutes.post("/", createBudgetHandler);
budgetRoutes.put("/:id", updateBudgetHandler);
budgetRoutes.delete("/:id", deleteBudgetHandler);

export default budgetRoutes;
