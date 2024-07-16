import { Router } from "express";
import {
  createCategoryHandler,
  deleteCategoryHandler,
  getCategoriesByIdHandler,
  getCategoriesHandler,
  updateCategoryHandler,
} from "../controllers/category.controller";

const categoryRoutes = Router();

categoryRoutes.get("/", getCategoriesHandler);
categoryRoutes.get("/:id", getCategoriesByIdHandler);
categoryRoutes.post("/", createCategoryHandler);
categoryRoutes.put("/:id", updateCategoryHandler);
categoryRoutes.delete("/:id", deleteCategoryHandler);

export default categoryRoutes;
