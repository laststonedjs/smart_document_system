import csv from "csv-parser";
import { Readable } from "stream";

export const parseCSV = (buffer) => {
  return new Promise((resolve, reject) => {
    const results = [];

    // creating a stream
    const stream = Readable.from(buffer.toString());

    stream
      .pipe(csv()) // async
      .on("data", (data) => {
        results.push({
          desc: data.desc,
          qty: Number(data.qty),
          price: Number(data.price),
          total: Number(data.total),
        });
      })
      .on("end", () => {
        const subtotal = results.reduce((sum, item) => sum + item.total, 0);

        // output
        resolve({
          documentType: "invoice",
          items: results,
          subtotal,     
          total: subtotal,
        });
      })
      .on("error", reject);
  });
};