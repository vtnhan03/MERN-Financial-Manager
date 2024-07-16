import catchErrors from "../utils/catchErrors";
import ExpenseModel from "../models/expense.model";
import { NOT_FOUND, OK } from "../constants/http";
import appAssert from "../utils/appAssert";
import {
  addExpenseAndUpdateBudget,
  removeExpenseAndUpdateBudget,
} from "../services/expense.service";

export const getAlLExpensesHandler = catchErrors(async (req, res) => {
  const expenses = await ExpenseModel.find({ userId: req.userId });
  console.log(req.userId);
  appAssert(expenses, NOT_FOUND, "Expenses not found");
  return res.status(OK).json(expenses);
});

export const getExpensesByBudgetIdHandler = catchErrors(async (req, res) => {
  const expenses = await ExpenseModel.find({
    budgetId: req.params.budgetId,
    userId: req.userId,
  });
  appAssert(expenses, NOT_FOUND, "Expenses not found");
  return res.status(OK).json(expenses);
});

export const createExpenseHandler = catchErrors(async (req, res) => {
  console.log(req.body.budgetId);
  const expense = await addExpenseAndUpdateBudget({
    ...req.body,
    userId: req.userId,
  }); // Corrected line

  appAssert(expense, NOT_FOUND, "Expense could not be created");

  return res.status(OK).json(expense);
});

export const updateExpenseHandler = catchErrors(async (req, res) => {
  const expense = await ExpenseModel.findOneAndUpdate(
    {
      _id: req.params.id,
      userId: req.userId,
    },
    req.body,
    { new: true }
  );
  return res.status(OK).json(expense);
});

export const deleteExpenseHandler = catchErrors(async (req, res) => {
  const { expense, message } = await removeExpenseAndUpdateBudget(
    req.params.id
  );

  appAssert(expense, NOT_FOUND, "Expense not found");

  return res.status(OK).json({ message });
});
