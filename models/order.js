import mongoose, { Schema } from "mongoose";

const orderSchema = new Schema(
  {
    user_id: {
      type: String,
      required: true,
    },
    nama: {
      type: String,
      required: true,
    },
    kategori: {
      type: String,
      required: true,
    },
    jumlah: {
      type: Number,
      required: true,
    },
    harga: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("order", orderSchema);
