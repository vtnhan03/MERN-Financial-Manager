import { Router } from "express";
import {
  createGoalHandler,
  deleteGoalHandler,
  getGoalByIdHandler,
  getGoalsHandler,
  updateGoalHandler,
} from "../controllers/goal.controller";

const goalRoutes = Router();

goalRoutes.get("/", getGoalsHandler);
goalRoutes.post("/", createGoalHandler);
goalRoutes.get("/:id", getGoalByIdHandler);
goalRoutes.put("/:id", updateGoalHandler);
goalRoutes.delete("/:id", deleteGoalHandler);

export default goalRoutes;
