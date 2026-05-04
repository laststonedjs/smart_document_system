import express from "express";
import { upload } from "../utils/upload.js";
import { handleCSVUpload, handlePDFUpload, handleTXTUpload, handleImageUpload } from "../controllers/uploadController.js"

const router = express.Router();

router.post("/csv", upload.single("file"), handleCSVUpload);
router.post("/pdf", upload.single("file"), handlePDFUpload);
router.post("/txt", upload.single("file"), handleTXTUpload);
router.post("/image", upload.single("file"), handleImageUpload);

export default router;