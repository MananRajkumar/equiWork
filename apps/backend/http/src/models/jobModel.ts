import mongoose, { model, Schema, Document, Model, ObjectId } from "mongoose";
import { JobStatus } from "../schemas/utilSchema";

interface jobInterface extends Document{
    postId: ObjectId;
    status: JobStatus;
}

const jobSchema: Schema<jobInterface> = new Schema({
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    status: {
        type: String,
        enum: Object.values(JobStatus),
        default: JobStatus.Incomplete
    }
}, { timestamps: true });

export const Job: Model<jobInterface> = model("Job", jobSchema);