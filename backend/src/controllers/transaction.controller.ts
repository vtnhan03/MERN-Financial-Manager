import { NOT_FOUND, OK } from "../constants/http";
import GoalTransactionModel from "../models/transaction.model";
import {
  addTransactionAndUpdateGoal,
  removeTransactionAndUpdateGoal,
} from "../services/transaction.service";
import appAssert from "../utils/appAssert";
import catchErrors from "../utils/catchErrors";

export const getTransactionsHandler = catchErrors(async (req, res) => {
  console.log(req.params.goalId);
  const transactions = await GoalTransactionModel.find({
    userId: req.userId,
    goalId: req.params.goalId,
  });
  appAssert(transactions, NOT_FOUND, "Transactions not found");
  return res.status(OK).json(transactions);
});

export const createTransactionHandler = catchErrors(async (req, res) => {
  console.log(req.body);
  const transaction = await addTransactionAndUpdateGoal({
    ...req.body,
    userId: req.userId,
  });
  appAssert(transaction, NOT_FOUND, "Transaction could not be created");
  return res.status(OK).json(transaction);
});

export const updateTransactionHandler = catchErrors(async (req, res) => {
  const transaction = await GoalTransactionModel.findOneAndUpdate(
    {
      _id: req.params.id,
      userId: req.userId,
    },
    req.body
  );
  appAssert(transaction, NOT_FOUND, "Transaction not found");
  return res.status(OK).json(transaction);
});
export const deleteTransactionHandler = catchErrors(async (req, res) => {
  const { transaction, message } = await removeTransactionAndUpdateGoal(
    req.params.id
  );
  appAssert(transaction, NOT_FOUND, "Transaction not found");
  return res.status(OK).json({ message });
});
