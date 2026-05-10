import express from "express";
import { saveDocument, getDocuments, updateDocument } from "../controllers/documentController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, saveDocument);
router.get("/", protect, getDocuments);
router.put("/:id", protect, updateDocument);

export default router;