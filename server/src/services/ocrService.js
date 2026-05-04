import Tesseract from "tesseract.js";

export const parseImage = async (buffer) => {
  const result = await Tesseract.recognize(buffer, "eng");

  return {
    rawText: result.data.text,
  };
};