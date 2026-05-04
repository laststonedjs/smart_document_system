export const validatePDF = (data) => {
  const issues = [];

  // REQUIRED FIELDS
  if (!data.supplier) {
    issues.push({
      type: "MISSING_SUPPLIER",
      message: "Supplier is missing",
    });
  }

  if (!data.documentNumber) {
    issues.push({
      type: "MISSING_DOCUMENT_NUMBER",
      message: "Document number is missing",
    });
  }

  const isValidDate = (dateString) => {
    const regex = /^\d{4}\.\d{2}\.\d{2}$/;
    if (!regex.test(dateString)) return false;
    const [year, month, day] = dateString.split(".").map(Number);
    // Napravi Date objekat uzimajući u obzir da je mesec u JS 0-indexiran
    const date = new Date(year, month - 1, day);
    // Provera da li su delovi datuma stvarno odgovaraju datumu
    return (
        date.getFullYear() === year &&
        date.getMonth() === (month - 1) &&
        date.getDate() === day
    );
  };

  if (!data.date) {
    issues.push({
        type: "MISSING_DATE",
        message: "Date is missing",
    });
  } else if (!isValidDate(data.date)) {
    issues.push({
        type: "INVALID_DATE",
        message: "Date must be in YYYY.MM.DD format and valid",
    });
  }

  // TOTAL VALIDATION
  if (!data.total) {
    issues.push({
      type: "MISSING_TOTAL",
      message: "Total amount is missing",
    });
  } else if (data.total <= 0) {
    issues.push({
      type: "INVALID_TOTAL",
      message: "Total must be greater than 0",
    });
  }

  // TOTAL CONSISTENCY
  if (data.subtotal && data.tax && data.total) {
    const expectedTotal = data.subtotal + data.tax;

    // decimal errors
    const diff = Math.abs(expectedTotal - data.total);

    if (diff > 0.01) {
        issues.push({
        type: "TOTAL_MISMATCH",
        message: `Total should be ${expectedTotal}, but got ${data.total}`,
        });
    }
  }

  return issues;
};