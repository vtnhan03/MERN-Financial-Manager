import mongoose from "mongoose";

interface GoalTransactionDocument extends mongoose.Document {
  goalId: mongoose.Schema.Types.ObjectId;
  userId: mongoose.Schema.Types.ObjectId;
  amount: number;
  transactionDate: Date;
  type: "deposit" | "withdrawal";
  createdAt: Date;
  updatedAt: Date;
}

const goalTransactionSchema = new mongoose.Schema<GoalTransactionDocument>(
  {
    goalId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Goal",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    amount: { type: Number, required: true },
    transactionDate: { type: Date, required: true, default: Date.now },
    type: { type: String, enum: ["deposit", "withdrawal"], required: true },
  },
  {
    timestamps: true,
  }
);

const GoalTransactionModel = mongoose.model<GoalTransactionDocument>(
  "GoalTransaction",
  goalTransactionSchema
);

export default GoalTransactionModel;
