import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

// routes
import uploadRoutes from "./routes/uploadRoutes.js";
import documentRoutes from "./routes/documentRoutes.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();    
const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/upload", uploadRoutes);
app.use("/api/documents", documentRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
    res.send("API is running..");
});

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})