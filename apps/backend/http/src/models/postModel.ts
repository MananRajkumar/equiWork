import mongoose, { model, Schema, Document, Model, ObjectId } from "mongoose";

interface postInterface extends Document{
    title: string,
    description: string,
    skillsRequired?: [string],
    applications?: [ObjectId],
    selectedUser?: {
        userId: ObjectId
    },
    status: string
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
    skillsRequired: {
        type: [String]
    },
    applications: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Application"
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
        enum: ["open", "closed"],
        default: "open"
    }
}, { timestamps: true });

export const Post: Model<postInterface> = model("Post", postSchema);