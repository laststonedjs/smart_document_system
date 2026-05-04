export const getEndpoint = (file) => {
  const name = file.name.toLowerCase();

  if (name.endsWith(".pdf")) return "pdf";
  if (name.endsWith(".csv")) return "csv";
  if (name.endsWith(".txt")) return "txt";

  // image fallback
  if (
    name.endsWith(".png") ||
    name.endsWith(".jpg") ||
    name.endsWith(".jpeg")
  ) {
    return "image";
  }

  return null;
};
