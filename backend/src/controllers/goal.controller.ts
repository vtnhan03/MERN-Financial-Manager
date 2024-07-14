import e from "express";
import { NOT_FOUND, OK } from "../constants/http";
import GoalModel from "../models/goal.model";
import appAssert from "../utils/appAssert";
import catchErrors from "../utils/catchErrors";

export const getGoalsHandler = catchErrors(async (req, res) => {
  const goals = await GoalModel.find({ userId: req.userId });
  appAssert(goals, NOT_FOUND, "Goals not found");
  return res.status(OK).json(goals);
});

export const createGoalHandler = catchErrors(async (req, res) => {
  const goal = await GoalModel.create({
    ...req.body,
    userId: req.userId,
  });

  appAssert(goal, NOT_FOUND, "Goal could not be created");

  return res.status(OK).json(goal);
});

export const updateGoalHandler = catchErrors(async (req, res) => {
  const goal = await GoalModel.findOneAndUpdate(
    {
      _id: req.params.id,
      userId: req.userId,
    },
    req.body,
    { new: true }
  );
  appAssert(goal, NOT_FOUND, "Goal not found");
  return res.status(OK).json(goal);
});

export const deleteGoalHandler = catchErrors(async (req, res) => {
  const deleted = await GoalModel.findOneAndDelete({
    _id: req.params.id,
    userId: req.userId,
  });
  appAssert(deleted, NOT_FOUND, "Goal not found");
  return res.status(OK).json({ message: "Goal deleted" });
});
