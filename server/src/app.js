import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

import uploadRoutes from "./routes/uploadRoutes.js";
import documentRoutes from "./routes/documentRoutes.js";

dotenv.config();    
const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/upload", uploadRoutes);
app.use("/api/documents", documentRoutes);

app.get("/", (req, res) => {
    res.send("API is running..");
});

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})