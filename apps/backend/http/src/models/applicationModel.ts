import mongoose, { model, Schema, Document, Model, ObjectId } from "mongoose";

interface applicationInterface extends Document{
    postId: ObjectId;
    applicant: ObjectId;
    description: string;
}

const applicationSchema: Schema<applicationInterface> = new Schema({
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    applicant: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    description: {
        type: String
    }
}, { timestamps: true });

export const Application: Model<applicationInterface> = model("Application", applicationSchema);