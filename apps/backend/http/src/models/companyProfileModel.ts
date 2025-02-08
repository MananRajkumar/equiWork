import mongoose, { model, Schema, Document, Model, ObjectId } from "mongoose";

interface companyProfileInterface extends Document {
    userId: ObjectId;
    companyName: string;
    profilePic: string;
    posts: ObjectId[];
    applications: ObjectId[];
    createdJobs: ObjectId[];
  }
  
  const companyProfileSchema: Schema<companyProfileInterface> = new Schema(
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserAuth",
        required: true,
      },
      companyName: {
        type: String,
        required: true
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
      ]
    },
    { timestamps: true }
  );
  
  
  
  export const CompanyProfile: Model<companyProfileInterface> = model(
    "CompanyProfile",
    companyProfileSchema
  );
  