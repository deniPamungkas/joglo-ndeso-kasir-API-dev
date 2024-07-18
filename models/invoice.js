import mongoose, { Schema } from "mongoose";

const invoiceSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    menuName: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("invoice", invoiceSchema);
