import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";

export const parsePDF = async (buffer) => {
  const uint8Array = new Uint8Array(buffer); // pdfjs requires Uint8Array, so I converted the Node buffer before parsing

  const loadingTask = pdfjsLib.getDocument({ data: uint8Array }); // loading PDF (return loadingTask which will load the PDF)
  const pdf = await loadingTask.promise; 

  let text = ""; // collecting text from all pages

  // loop over the pages
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i); // get the object
    const content = await page.getTextContent(); // extract the content

    const strings = content.items.map(item => item.str);
    text += strings.join(" ") + "\n";
  }

  return {
    rawText: text,
  };
};