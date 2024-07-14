import { NOT_FOUND, OK } from "../constants/http";
import BudgetModel from "../models/budget.model";
import appAssert from "../utils/appAssert";
import catchErrors from "../utils/catchErrors";

export const getBudgetsHandler = catchErrors(async (req, res) => {
  const budgets = await BudgetModel.find({ userId: req.userId });
  appAssert(budgets, NOT_FOUND, "Budgets not found");
  return res.status(OK).json(budgets);
});

export const createBudgetHandler = catchErrors(async (req, res) => {
  const budget = await BudgetModel.create({
    ...req.body,
    userId: req.userId,
  });

  appAssert(budget, NOT_FOUND, "Budget could not be created");

  return res.status(OK).json(budget);
});

export const updateBudgetHandler = catchErrors(async (req, res) => {
  const budget = await BudgetModel.findOneAndUpdate(
    {
      _id: req.params.id,
      userId: req.userId,
    },
    req.body,
    { new: true }
  );
  appAssert(budget, NOT_FOUND, "Budget not found");
  return res.status(OK).json(budget);
});

export const deleteBudgetHandler = catchErrors(async (req, res) => {
  await BudgetModel.findOneAndDelete({
    _id: req.params.id,
    userId: req.userId,
  });
  return res.status(OK).json({ message: "Budget deleted" });
});
