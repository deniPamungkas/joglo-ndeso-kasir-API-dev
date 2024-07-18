import mongoose, { Schema } from "mongoose";

const invoiceNameSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("invoice-name", invoiceNameSchema);
