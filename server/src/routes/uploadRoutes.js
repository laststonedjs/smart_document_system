import express from "express";
import { upload } from "../utils/upload.js";
import { handleCSVUpload, handlePDFUpload, handleTXTUpload, handleImageUpload } from "../controllers/uploadController.js"

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/csv", protect, upload.single("file"), handleCSVUpload);
router.post("/pdf", protect, upload.single("file"), handlePDFUpload);
router.post("/txt", protect, upload.single("file"), handleTXTUpload);
router.post("/image", protect, upload.single("file"), handleImageUpload);

export default router;