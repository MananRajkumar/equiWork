import mongoose, { model, Schema, Document, Model, ObjectId } from "mongoose";

interface applicationInterface extends Document{}

const applicationSchema: Schema<applicationInterface> = new Schema({}, { timestamps: true });

export const Application: Model<applicationInterface> = model("Application", applicationSchema);