import mongoose, { Schema } from "mongoose";

const menuSchema = new Schema({
  name: { type: String, unique: true, required: true },
  price: { type: Number, required: true },
  profit: { type: Number, required: true },
  category: { type: String, required: true },
  amount: { type: Number, required: true },
});

export default mongoose.model("menu", menuSchema);
