import mongoose from "mongoose";

export interface BudgetDocument
  extends mongoose.Document<mongoose.Types.ObjectId> {
  name: string;
  amount: number;
  amountLeft: number;
  userId: mongoose.Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
  description: string;
}

const budgetSchema = new mongoose.Schema<BudgetDocument>(
  {
    name: { type: String, required: true },
    amount: { type: Number, required: true },
    amountLeft: {
      type: Number,
      required: true,
      default: function () {
        return this.amount;
      },
    },
    description: { type: String },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const BudgetModel = mongoose.model<BudgetDocument>("Budget", budgetSchema);
export default BudgetModel;
