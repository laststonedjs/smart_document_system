export const validateCSV = (data) => {
  const issues = [];

  // Validate line items
  data.items.forEach((item, index) => {
    const expectedTotal = item.qty * item.price;

    if (expectedTotal !== item.total) {
      issues.push({
        type: "LINE_ITEM_MISMATCH",
        message: `Item ${index + 1} total is incorrect`,
      });
    }

    if (!item.desc || !item.qty || !item.price) {
      issues.push({
        type: "MISSING_FIELD",
        message: `Item ${index + 1} has missing fields`,
      });
    }
  });

  // Validate subtotal
  const calculatedSubtotal = data.items.reduce(
    (sum, item) => sum + item.total,
    0
  );

  if (calculatedSubtotal !== data.subtotal) {
    issues.push({
      type: "SUBTOTAL_MISMATCH",
      message: "Subtotal does not match sum of items",
    });
  }

  return issues;
};