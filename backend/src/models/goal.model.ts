import mongoose from "mongoose";

export interface GoalDocument
  extends mongoose.Document<mongoose.Types.ObjectId> {
  name: string;
  targetAmount: number;
  currentAmount: number;
  user: mongoose.Schema.Types.ObjectId;
  dueDate: Date;
  createdAt: Date;
  updatedAt: Date;
  omitSensitiveInfo(): Pick<
    GoalDocument,
    | "_id"
    | "name"
    | "targetAmount"
    | "currentAmount"
    | "user"
    | "dueDate"
    | "createdAt"
    | "updatedAt"
    | "__v"
  >;
}

const goalSchema = new mongoose.Schema<GoalDocument>(
  {
    name: { type: String, required: true },
    targetAmount: { type: Number, required: true },
    currentAmount: { type: Number, default: 0 },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    dueDate: { type: Date, required: true },
  },
  {
    timestamps: true,
  }
);

goalSchema.methods.omitSensitiveInfo = function () {
  const goal = this.toObject();
  return goal;
};

const GoalModel = mongoose.model<GoalDocument>("Goal", goalSchema);
export default GoalModel;
