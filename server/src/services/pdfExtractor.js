export const extractPDFData = (text) => {
  const data = {};
  const normalizedText = text.replace(/\s+/g, " ").trim();
  console.log("normalized text: ", normalizedText);

  // SUPPLIER
  const supplierStart = normalizedText.indexOf("Supplier:"); // returns the position where the word starts
  const numberStart = normalizedText.indexOf("Number:");
  console.log("normalized text: ", normalizedText);

  if (supplierStart !== -1 && numberStart !== -1) {
    data.supplier = normalizedText
      .substring(supplierStart + 9, numberStart) // take the text between supplierStart (because Supplier has 9 characters) and Number, we want here to skip label and take only the value
      .trim();
  }

  // DOCUMENT NUMBER
  const numberMatch = normalizedText.match(/Number:\s*([A-Z0-9-]+)/i);
  if (numberMatch) {
    data.documentNumber = numberMatch[1];
  }

  // fallback   
  if (!data.documentNumber) {
  const altNumberMatch = normalizedText.match(/Invoice\s+([A-Z0-9-]+)/i);
    if (altNumberMatch) {
        data.documentNumber = altNumberMatch[1];
    }
  }

  // DATE
  const dateMatch = normalizedText.match(/Date:\s*(\d{4}-\d{2}-\d{2})/);
  if (dateMatch) {
    data.date = dateMatch[1];
  }

  // TOTAL
  const totalMatch = normalizedText.match(/Total[:\s]+(\d+(\.\d+)?)/i);

  if (totalMatch) {
    data.total = Number(totalMatch[1]);
  }

  // TOTAL
  const subtotalMatch = normalizedText.match(/Subtotal\s+(\d+(\.\d+)?)/i);
  if (subtotalMatch) {
    data.subtotal = Number(subtotalMatch[1]);
  }

  // TAX
  const taxMatch = normalizedText.match(/Tax.*?\s+(\d+(\.\d+)?)/i);
  if (taxMatch) {
    data.tax = Number(taxMatch[1]);
  }

  // currency
  const currencyMatch = normalizedText.match(/\b(BAM|EUR|USD)\b/i);
  if (currencyMatch) {
    data.currency = currencyMatch[1].toUpperCase();
  }

  return {
    documentType: normalizedText.toLowerCase().includes("invoice")
      ? "invoice"
      : "purchase_order",
    ...data,
  };
};