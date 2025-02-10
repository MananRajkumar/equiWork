import mongoose, { model, Schema, Document, Model, ObjectId } from "mongoose";
import { PostStatus } from "../schemas/utilSchema";

interface postInterface extends Document{
    title: string,
    description: string,
    createdBy: ObjectId,
    skillsRequired: string[],
    selectedUser?: {
        userId: ObjectId
    },
    status: PostStatus
}

const postSchema: Schema<postInterface> = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CompanyProfile",
        required: true
    },
    skillsRequired: {
        type: [String]
    },
    selectedUser: {
        type: {
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "UserAuth",
                required: true
            }
        }
    },
    status: {
        type: String,
        enum: Object.values(PostStatus),
        default: PostStatus.Open
    }
}, { timestamps: true });

export const Post: Model<postInterface> = model("Post", postSchema);