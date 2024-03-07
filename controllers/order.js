import orderSchema from "../models/order.js";
import jwt from "jsonwebtoken";

export const addOrder = async (req, res) => {
  const token = req.cookies.accessToken;
  try {
    jwt.verify(token, process.env.SECRET_KEY, async (err, userInfo) => {
      if (err) return res.status(500).json({ message: "not logged in" });
      await orderSchema.insertMany(req.body.data);
      return res.status(200).json({ message: "berhasil menambahkan pesanan" });
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};
