import express from "express";
import cors from "cors";
import { config } from "dotenv";
import connectDB from "./configs/database";
import chatRoutes from "./routes/chatRoutes";
import postRoutes from "./routes/postRoutes";
import userRoutes from "./routes/userRoutes";
import authRoutes from "./routes/authRoutes";
import applicationRoutes from "./routes/applicationRoutes";

config();
connectDB();

const app = express();

const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());

app.use("/api/v1/application", applicationRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/chat", chatRoutes);
app.use("/api/v1/post", postRoutes);
app.use("/api/v1/user", userRoutes);



app.listen(PORT, () => {
  console.log(`Server started listening on PORT ${PORT}`);
});