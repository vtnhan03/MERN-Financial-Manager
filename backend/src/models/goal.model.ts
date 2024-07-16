import mongoose from "mongoose";

export interface GoalDocument
  extends mongoose.Document<mongoose.Types.ObjectId> {
  name: string;
  targetAmount: number;
  currentAmount: number;
  userId: mongoose.Schema.Types.ObjectId;
  dueDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

const goalSchema = new mongoose.Schema<GoalDocument>(
  {
    name: { type: String, required: true },
    targetAmount: { type: Number, required: true },
    currentAmount: { type: Number, default: 0 },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    dueDate: { type: Date, required: true },
  },
  {
    timestamps: true,
  }
);

const GoalModel = mongoose.model<GoalDocument>("Goal", goalSchema);
export default GoalModel;
