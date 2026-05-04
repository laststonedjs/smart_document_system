import { parseCSV } from "../services/csvService.js";
import { validateCSV } from "../services/validator.js";
import { parsePDF } from "../services/pdfService.js";
import { extractPDFData } from "../services/pdfExtractor.js";
import { validatePDF } from "../services/pdfValidator.js";
import { parseTXT } from "../services/txtService.js";
import { parseImage } from "../services/ocrService.js";

export const handleCSVUpload = async (req, res) => {
  try {
    const file = req.file;          

    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // here we're sending file to the csvService
    const parsedData = await parseCSV(file.buffer);

    const issues = validateCSV(parsedData);

    const result = {
        ...parsedData,
        issues,
        status: issues.length > 0 ? "needs_review" : "validated"
    }

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error processing file" });
  }
};

export const handlePDFUpload = async (req, res) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const { rawText } = await parsePDF(file.buffer);

    const extractedData = extractPDFData(rawText);

    const issues = validatePDF(extractedData);

    res.json({
      rawText,
      ...extractedData,
      issues,
      status: issues.length > 0 ? "needs_review" : "validated"
    });
  } catch (error) {
    console.error("PDF ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

export const handleTXTUpload = async (req, res) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const { rawText } = parseTXT(file.buffer);

    const extractedData = extractPDFData(rawText);
    const issues = validatePDF(extractedData);

    res.json({
      rawText,
      ...extractedData,
      issues,
      status: issues.length > 0 ? "needs_review" : "validated",
    });
  } catch (error) {
    console.error("TXT ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

export const handleImageUpload = async (req, res) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const { rawText } = await parseImage(file.buffer);

    const extractedData = extractPDFData(rawText);
    const issues = validatePDF(extractedData);

    res.json({
      rawText,
      ...extractedData,
      issues,
      status: issues.length > 0 ? "needs_review" : "validated",
    });
  } catch (error) {
    console.error("OCR ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};