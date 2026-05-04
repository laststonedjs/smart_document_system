import mongoose from "mongoose";

// for CSV
const itemSchema = new mongoose.Schema({
  desc: String,
  qty: Number,
  price: Number,
  total: Number,
});

// validator
const issueSchema = new mongoose.Schema({
  type: String,
  message: String,
});

const documentSchema = new mongoose.Schema(
  {
    documentType: String,
    supplier: String,
    documentNumber: String,
    date: String,
    currency: String,

    items: [itemSchema],

    subtotal: Number,
    tax: Number,
    total: Number,

    issues: [issueSchema],

    status: {
      type: String,
      enum: ["uploaded", "needs_review", "validated", "rejected"],
      default: "uploaded",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Document", documentSchema);