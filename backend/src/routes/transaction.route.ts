import { Router } from "express";
import {
  createTransactionHandler,
  deleteTransactionHandler,
  getTransactionsHandler,
  updateTransactionHandler,
} from "../controllers/transaction.controller";

const transactionRoutes = Router();

transactionRoutes.post("/", createTransactionHandler);
transactionRoutes.get("/:goalId", getTransactionsHandler);
transactionRoutes.put("/:id", updateTransactionHandler);
transactionRoutes.delete("/:id", deleteTransactionHandler);

export default transactionRoutes;
