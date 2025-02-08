import mongoose, { model, Schema, Document, Model, ObjectId } from "mongoose";
import { Role } from "../schemas/utilSchema";

interface userAuthInterface extends Document {
  email: string;
  password: string;
  role: Role;
}

const userAuthSchema: Schema<userAuthInterface> = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: Object.values(Role),
      required: true
    }
  },
  { timestamps: true }
);

export const UserAuth: Model<userAuthInterface> = model(
  "UserAuth",
  userAuthSchema
);