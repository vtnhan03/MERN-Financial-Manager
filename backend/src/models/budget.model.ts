import mongoose from "mongoose";

export interface BudgetDocument
  extends mongoose.Document<mongoose.Types.ObjectId> {
  name: string;
  amount: number;
  user: mongoose.Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
  omitSensitiveInfo(): Pick<
    BudgetDocument,
    "_id" | "name" | "amount" | "user" | "createdAt" | "updatedAt" | "__v"
  >;
}

const budgetSchema = new mongoose.Schema<BudgetDocument>(
  {
    name: { type: String, required: true },
    amount: { type: Number, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  {
    timestamps: true,
  }
);

budgetSchema.methods.omitSensitiveInfo = function () {
  const budget = this.toObject();
  return budget;
};

const BudgetModel = mongoose.model<BudgetDocument>("Budget", budgetSchema);
export default BudgetModel;
