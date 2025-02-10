import mongoose, { model, Schema, Document, Model, ObjectId } from "mongoose";
import { ApplicationStatus } from "../schemas/utilSchema";

interface applicationInterface extends Document {
  postId: ObjectId;
  applicant: ObjectId;
  description: string;
  status: ApplicationStatus;
}

const applicationSchema: Schema<applicationInterface> = new Schema(
  {
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    applicant: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    description: {
      type: String,
    },
    status: {
        type: String,
        enum: Object.values(ApplicationStatus),
        default: ApplicationStatus.Pending
      },
  },
  { timestamps: true }
);

export const Application: Model<applicationInterface> = model(
  "Application",
  applicationSchema
);
