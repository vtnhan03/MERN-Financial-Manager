import { Router } from "express";
import {
  createCategoryHandler,
  deleteCategoryHandler,
  getCategoriesHandler,
  updateCategoryHandler,
} from "../controllers/category.controller";

const categoryRoutes = Router();

categoryRoutes.get("/", getCategoriesHandler);
categoryRoutes.post("/", createCategoryHandler);
categoryRoutes.put("/:id", updateCategoryHandler);
categoryRoutes.delete("/:id", deleteCategoryHandler);

export default categoryRoutes;
