import { NOT_FOUND, OK } from "../constants/http";
import CategoryModel from "../models/category.model";
import appAssert from "../utils/appAssert";
import catchErrors from "../utils/catchErrors";

export const getCategoriesHandler = catchErrors(async (req, res) => {
  const categories = await CategoryModel.find({ userId: req.userId });
  appAssert(categories, NOT_FOUND, "Categories not found");
  return res.status(OK).json(categories);
});

export const getCategoriesByIdHandler = catchErrors(async (req, res) => {
  const category = await CategoryModel.findOne({ _id: req.params.id });
  appAssert(category, NOT_FOUND, "Category not found");
  return res.status(OK).json(category);
});

export const createCategoryHandler = catchErrors(async (req, res) => {
  const category = await CategoryModel.create({
    ...req.body,
    // userId: req.userId,
  });

  appAssert(category, NOT_FOUND, "Category could not be created");

  return res.status(OK).json(category);
});

export const updateCategoryHandler = catchErrors(async (req, res) => {
  console.log(req.params.id);

  const category = await CategoryModel.findOneAndUpdate(
    {
      _id: req.params.id,
      //   userId: req.userId,
    },
    req.body,
    { new: true }
  );
  appAssert(category, NOT_FOUND, "Category not found");
  return res.status(OK).json(category);
});

export const deleteCategoryHandler = catchErrors(async (req, res) => {
  const deleted = await CategoryModel.findOneAndDelete({
    _id: req.params.id,
    // userId: req.userId,
  });
  appAssert(deleted, NOT_FOUND, "Category not found");
  return res.status(OK).json({ message: "Category deleted" });
});
