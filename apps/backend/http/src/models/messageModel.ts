import mongoose, { model, Schema, Document, Model, ObjectId } from "mongoose";

interface messageInterface extends Document{
    chatId: ObjectId,
    sender: ObjectId,
    receiver: ObjectId,
    content: string
}

const messageSchema: Schema<messageInterface> = new Schema({
    chatId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chat",
        required: true
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserAuth",
        required: true
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserAuth",
        required: true
    },
    content: {
          type: String,
          required: true
    }
}, { timestamps: true });

export const Message: Model<messageInterface> = model("Message", messageSchema);