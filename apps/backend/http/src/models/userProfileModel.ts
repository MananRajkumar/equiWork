import mongoose, { model, Schema, Document, Model, ObjectId } from "mongoose";

interface userProfileInterface extends Document {
    userId: ObjectId;
    fullName: string;
    languages: string[];
    profilePic: string;
    applications: ObjectId[];
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
      applications: [
        {
          applicationId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Application",
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
  