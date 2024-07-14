import mongoose from "mongoose";

export interface ExpenseDocument
  extends mongoose.Document<mongoose.Types.ObjectId> {
  name: string;
  amount: number;
  budget: mongoose.Schema.Types.ObjectId;
  user: mongoose.Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
  omitSensitiveInfo(): Pick<
    ExpenseDocument,
    | "_id"
    | "name"
    | "amount"
    | "budget"
    | "user"
    | "createdAt"
    | "updatedAt"
    | "__v"
  >;
}

const expenseSchema = new mongoose.Schema<ExpenseDocument>(
  {
    name: { type: String, required: true },
    amount: { type: Number, required: true },
    budget: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Budget",
      required: true,
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  {
    timestamps: true,
  }
);

expenseSchema.methods.omitSensitiveInfo = function () {
  const expense = this.toObject();
  return expense;
};

const ExpenseModel = mongoose.model<ExpenseDocument>("Expense", expenseSchema);
export default ExpenseModel;
