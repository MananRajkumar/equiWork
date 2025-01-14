import mongoose, { model, Schema, Document, Model, ObjectId } from "mongoose";

interface userAuthInterface extends Document {
  email: string;
  password: string;
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
  },
  { timestamps: true }
);

export const UserAuth: Model<userAuthInterface> = model(
  "UserAuth",
  userAuthSchema
);

interface userProfileInterface extends Document {
  userId: ObjectId;
  fullName: string;
  languages: string[];
  profilePic: string;
  posts: ObjectId[];
  applications: ObjectId[];
  createdJobs: ObjectId[];
  selectedJobs: ObjectId[];
}

const userProfileSchema: Schema<userProfileInterface> = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserAuth",
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    languages: {
      type: [String],
    },
    profilePic: {
      type: String,
    },
    posts: [
      {
        postId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Post",
        },
      },
    ],
    applications: [
      {
        applicationId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Application",
        },
      },
    ],
    createdJobs: [
      {
        jobId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Job",
        },
      },
    ],
    selectedJobs: [
      {
        jobId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Job",
        },
      },
    ],
  },
  { timestamps: true }
);

export const UserProfile: Model<userProfileInterface> = model(
  "UserProfile",
  userProfileSchema
);
