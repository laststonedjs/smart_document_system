import express from "express";
import { saveDocument, getDocuments, updateDocument, deleteDocument } from "../controllers/documentController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, saveDocument);
router.get("/", protect, getDocuments);
router.put("/:id", protect, updateDocument);
router.delete("/:id", protect, deleteDocument);

export default router;