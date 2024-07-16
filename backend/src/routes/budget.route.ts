import { Router } from "express";
import {
  createBudgetHandler,
  deleteBudgetHandler,
  getBudgetByIdHandler,
  getBudgetsHandler,
  updateBudgetHandler,
} from "../controllers/budget.controller";

const budgetRoutes = Router();

budgetRoutes.get("/", getBudgetsHandler);
budgetRoutes.post("/", createBudgetHandler);
budgetRoutes.get("/:id", getBudgetByIdHandler);
budgetRoutes.put("/:id", updateBudgetHandler);
budgetRoutes.delete("/:id", deleteBudgetHandler);

export default budgetRoutes;
