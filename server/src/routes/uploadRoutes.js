import express from "express";
import { upload } from "../utils/upload.js";
// controllers
import { 
    handleCSVUpload, 
    handlePDFUpload, 
    handleTXTUpload, 
    handleImageUpload 
} from "../controllers/uploadController.js"
// middleware
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/csv", protect, upload.single("file"), handleCSVUpload);
router.post("/pdf", protect, upload.single("file"), handlePDFUpload);
router.post("/txt", protect, upload.single("file"), handleTXTUpload);
router.post("/image", protect, upload.single("file"), handleImageUpload);

export default router;