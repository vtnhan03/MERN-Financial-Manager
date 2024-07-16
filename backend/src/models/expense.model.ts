import mongoose from "mongoose";

export interface ExpenseDocument
  extends mongoose.Document<mongoose.Types.ObjectId> {
  name: string;
  amount: number;
  budgetId: mongoose.Schema.Types.ObjectId;
  userId: mongoose.Schema.Types.ObjectId;
  categoryId: mongoose.Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
  expenseDate: Date;
}

const expenseSchema = new mongoose.Schema<ExpenseDocument>(
  {
    name: { type: String, required: true },
    amount: { type: Number, required: true },
    budgetId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Budget",
      required: true,
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    expenseDate: { type: Date, required: true, default: Date.now },
  },
  {
    timestamps: true,
  }
);

const ExpenseModel = mongoose.model<ExpenseDocument>("Expense", expenseSchema);
export default ExpenseModel;
