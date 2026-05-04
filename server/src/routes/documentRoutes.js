import express from "express";
import { saveDocument, getDocuments, updateDocument } from "../controllers/documentController.js";

const router = express.Router();

router.post("/", saveDocument);
router.get("/", getDocuments);
router.put("/:id", updateDocument);

export default router;