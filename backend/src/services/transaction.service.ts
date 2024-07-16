import mongoose from "mongoose";
import GoalModel from "../models/goal.model";
import TransactionModel from "../models/transaction.model";
import appAssert from "../utils/appAssert";
import { CONFLICT, NOT_FOUND } from "../constants/http";

export type CreateTransactionParams = {
  amount: number;
  goalId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  transactionDate: Date;
  type: "deposit" | "withdrawal";
};

export const addTransactionAndUpdateGoal = async (
  data: CreateTransactionParams
) => {
  const goal = await GoalModel.findOne({ _id: data.goalId });
  appAssert(goal, NOT_FOUND, "Goal not found");

  // Adjust goal.currentAmount based on transaction type
  if (data.type === "deposit") {
    goal.currentAmount += data.amount;
  } else if (data.type === "withdrawal") {
    goal.currentAmount -= data.amount;
  }

  appAssert(goal.currentAmount >= 0, CONFLICT, "Insufficient funds in goal");

  // Check if goal's target amount is exceeded
  appAssert(
    goal.currentAmount <= goal.targetAmount,
    CONFLICT,
    "Goal target amount exceeded"
  );

  await goal.save();

  const transaction = await TransactionModel.create({
    ...data,
    goalId: data.goalId,
  });

  return transaction;
};

export const removeTransactionAndUpdateGoal = async (id: string) => {
  const transaction = await TransactionModel.findById(id);
  appAssert(transaction, NOT_FOUND, "Transaction not found");
  const goal = await GoalModel.findById(transaction.goalId);
  appAssert(goal, NOT_FOUND, "Goal not found");
  goal.currentAmount -= transaction.amount;
  console.log(goal.currentAmount);
  await goal.save();
  await TransactionModel.findByIdAndDelete(id);
  return { message: "Transaction removed and goal updated", transaction };
};
