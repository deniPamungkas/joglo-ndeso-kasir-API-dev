import mongoose, { Schema } from "mongoose";

const orderSchema = new Schema(
  {
    user_id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    profit: {
      type: Number,
      required: true,
    },
    photo: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("order", orderSchema);
