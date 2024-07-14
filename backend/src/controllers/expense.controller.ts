import catchErrors from "../utils/catchErrors";
import ExpenseModel from "../models/expense.model";
import { NOT_FOUND, OK } from "../constants/http";
import appAssert from "../utils/appAssert";

export const getExpensesHandler = catchErrors(async (req, res) => {
  const expenses = await ExpenseModel.find({ userId: req.userId });
  appAssert(expenses, NOT_FOUND, "Expenses not found");
  return res.status(OK).json(expenses);
});

export const createExpenseHandler = catchErrors(async (req, res) => {
  const expense = await ExpenseModel.create({
    ...req.body,
    userId: req.userId,
  });

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
  await ExpenseModel.findOneAndDelete({
    _id: req.params.id,
    userId: req.userId,
  });
  return res.status(OK).json({ message: "Expense deleted" });
});
