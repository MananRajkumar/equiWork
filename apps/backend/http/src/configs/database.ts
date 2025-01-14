import mongoose from "mongoose";

export default async function connect() {
    const mongoUrl = process.env.MONGO_URL;

    if (!mongoUrl) {
        throw new Error("MONGO_URL is not defined in the environment variables.");
    }

    try {
        await mongoose.connect(mongoUrl);
        console.log(`Connected to Database: ${mongoUrl}`);
    } catch (error) {
        console.error("Database connection failed:", error);
        process.exit(1);
    }
}