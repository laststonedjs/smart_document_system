import Document from "../models/Document.js";
import { validatePDF } from "../services/pdfValidator.js";
import { validateCSV } from "../services/validator.js";

export const saveDocument = async (req, res) => {
  try {
    const data = req.body;

    let issues = [];

    if (
      data.documentType === "invoice" ||
      data.documentType === "purchase_order"
    ) {
      issues = validatePDF(data);
    } else {
      issues = validateCSV(data);
    }

    const existing = await Document.findOne({
      documentNumber: data.documentNumber,
    });

    if (existing) {
      issues.push({
        type: "DUPLICATE_DOCUMENT",
        message: "Document number already exists",
      });
    }

    const status = issues.length > 0 ? "needs_review" : "validated";

    const newDocument = new Document({
      ...data,
      user: req.user.userId,
      issues,
      status,
    });

    const saved = await newDocument.save();

    res.status(201).json(saved);
  } catch (error) {
    console.error("SAVE ERROR:", error);
    res.status(500).json({ message: "Failed to save document" });
  }
};

export const getDocuments = async (req, res) => {
  try {
    const documents = await Document.find({
      user: req.user.userId,
    }).sort({ createdAt: -1 });

    res.json(documents);
  } catch (error) {
    console.error("FETCH ERROR:", error);
    res.status(500).json({ message: "Failed to fetch documents" });
  }
};

export const updateDocument = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    // convert to the number
    data.subtotal = Number(data.subtotal);
    data.tax = Number(data.tax);
    data.total = Number(data.total);

    let issues = [];

    if (data.documentType === "invoice" || data.documentType === "purchase_order") {
      issues = validatePDF(data);
    } else {
      issues = validateCSV(data);
    }

    const existing = await Document.findOne({
      documentNumber: data.documentNumber,
      _id: { $ne: id }, // ignore current document
      user: req.user.userId,
    });

    if (existing) {
      issues.push({
        type: "DUPLICATE_DOCUMENT",
        message: "Document number already exists",
      });
    }

    const status = issues.length > 0 ? "needs_review" : "validated";

    const updated = await Document.findByIdAndUpdate(
      id,
      {
        ...data,
        issues,
        status,
      },
      { new: true }
    );

    console.log("Received data:", data);
    console.log("Issues found:", issues);
    res.json(updated);
  } catch (error) {
    console.error("UPDATE ERROR:", error);
    res.status(500).json({ message: "Update failed" });
  }
};

export const deleteDocument = async (req, res) => {
  try {
    const { id } = req.params;

    const document = await Document.findOne({
      _id: id,
      user: req.user.userId,
    });

    if (!document) {
      return res.status(404).json({
        message: "Document not found",
      });
    }

    await document.deleteOne();

    res.json({
      message: "Document deleted successfully",
    });

  } catch (error) {
    console.error("DELETE ERROR:", error);

    res.status(500).json({
      message: "Failed to delete document",
    });
  }
};