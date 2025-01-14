import express from "express";
import cors from "cors";
import { config } from "dotenv";
import connectDB from "./configs/database";
import chatRoutes from "./routes/chatRoutes";
import postRoutes from "./routes/postRoutes";
import userRoutes from "./routes/userRoutes";
import authRoutes from "./routes/authRoutes";

config();
connectDB();


const app = express();

const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());


app.use('/auth', authRoutes);
app.use('/chat', chatRoutes);
app.use('/post', postRoutes);
app.use('/user', userRoutes);


app.listen(PORT, () => {
    console.log(`Server started listening on PORT ${PORT}`);
});