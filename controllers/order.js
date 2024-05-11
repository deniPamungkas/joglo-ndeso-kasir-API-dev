import orderSchema from "../models/order.js";
import menuSchema from "../models/menu.js";
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
    console.log(error, "ini error");
    return res.status(500).json(error);
  }
};

export const getMenu = async (req, res) => {
  const token = req.cookies.accessToken;
  try {
    jwt.verify(token, process.env.SECRET_KEY, async (err, userInfo) => {
      if (err) return res.status(500).json({ message: "not logged in" });
      const allMenu = await menuSchema.find({ category: req.params.menu });
      return res.status(200).json(allMenu);
    });
    // const allMenu = await menuSchema.find({ category: req.params.menu });
    // console.log(allMenu);
    // return res.status(200).json(allMenu);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};
