import mongoose, { model, Schema, Document, Model, ObjectId } from "mongoose";

interface chatInterface extends Document{
    participants: [ObjectId]
}

const chatSchema: Schema<chatInterface> = new Schema({
    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserAuth",
        required: true
    }]
}, { timestamps: true });

export const Chat: Model<chatInterface> = model("Chat", chatSchema);