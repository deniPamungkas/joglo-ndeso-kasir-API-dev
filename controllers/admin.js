import orderSchema from "../models/order.js";
import menuSchema from "../models/menu.js";

export const getPenjualan = async (req, res) => {
  try {
    const result = await orderSchema.aggregate([
      {
        createdAt: {
          $gte: new Date("2024-03-03"),
          $lt: new Date("2024-03-11"),
        },
      },
    ]);
    //   user_id: "65e474546d2349e72493d006",
    //   createdAt: { $gte: new Date("2024-03-03"), $lt: new Date("2024-03-11") },
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const addNewMenu = async (req, res) => {
  const newMenu = new menuSchema({
    name: req.body.name,
    price: req.body.price,
    category: req.body.category,
    profit: req.body.profit,
    photo: req.body.photo,
    amount: 1,
  });
  try {
    const result = await newMenu.save();
    return res.status(200).json(result);
  } catch (error) {
    if (error.keyValue) {
      return res
        .status(400)
        .json({ errMessage: error.keyValue.name + " sudah ada dalam menu" });
    }
    return res.status(500).json(error);
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const allProducts = await menuSchema.find();
    return res.status(200).json(allProducts);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await menuSchema.find({ name: req.body.name });
    console.log(product);
    return res.status(200).json(product);
  } catch (error) {
    console.log(error);
  }
};
