import mongoose, { Schema } from "mongoose";

const tokenSchema = new Schema({
  user_id: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
});

export default mongoose.model("token", tokenSchema);
