import mongoose from "mongoose";
import BudgetModel from "../models/budget.model";
import appAssert from "../utils/appAssert";
import { NOT_FOUND } from "../constants/http";
import ExpenseModel from "../models/expense.model";

export type CreateExpenseParams = {
  name: string;
  amount: number;
  budgetId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  categoryId: mongoose.Types.ObjectId;
};
export const addExpenseAndUpdateBudget = async (data: CreateExpenseParams) => {
  const budget = await BudgetModel.findOne({ _id: data.budgetId });
  appAssert(budget, NOT_FOUND, "Budget not found");
  budget.amountLeft -= data.amount;
  console.log(budget.amountLeft);
  appAssert(
    budget.amountLeft >= data.amount,
    NOT_FOUND,
    "Budget amount exceeded"
  );
  await budget.save();

  const expense = await ExpenseModel.create({
    ...data,
    budgetId: data.budgetId,
  });
  return expense;
};

export const removeExpenseAndUpdateBudget = async (id: string) => {
  const expense = await ExpenseModel.findById(id);
  appAssert(expense, NOT_FOUND, "Expense not found");

  const budget = await BudgetModel.findById(expense.budgetId);
  appAssert(budget, NOT_FOUND, "Budget not found");

  budget.amountLeft += expense.amount;

  await budget.save();

  await ExpenseModel.findByIdAndDelete(id);

  return { message: "Expense removed and budget updated", expense };
};
