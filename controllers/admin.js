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
    const allProducts = await menuSchema.find().sort({ category: 1 });
    return res.status(200).json(allProducts);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await menuSchema.findOneAndDelete({ name: req.body.name });
    return res.status(200).json(product);
  } catch (error) {
    console.log(error);
  }
};

export const editMenu = async (req, res) => {
  try {
    const menu = await menuSchema.findOne({ name: req.body.name });
    return res.status(200).json(menu);
  } catch (error) {
    return res.status(400).json(error);
  }
};

export const updateMenu = async (req, res) => {
  try {
    const menu = await menuSchema.findOne({ name: req.params.id });
    menu.name = req.body.name;
    menu.price = req.body.price;
    menu.category = req.body.category;
    menu.profit = req.body.profit;
    menu.photo = req.body.photo;

    const editedMenu = await menu.save();
    return res.status(200).json(editedMenu);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const getSixMonthOrders = async (req, res) => {
  const sixMonth = new Date();
  sixMonth.setMonth(sixMonth.getMonth() - 6);
  const now = new Date();
  try {
    const result = await orderSchema.aggregate([
      {
        $match: {
          createdAt: {
            $gte: sixMonth,
            $lt: now,
          },
        },
      },
      {
        $group: {
          _id: {
            bulan: { $month: "$createdAt" },
          },
          keuntungan: { $sum: "$profit" },
          jumlah: { $count: {} },
        },
      },
      {
        $sort: {
          "_id.bulan": 1,
        },
      },
    ]);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json(error);
  }
};

export const getSixMonthOrdersSum = async (req, res) => {
  const sixMonth = new Date();
  sixMonth.setMonth(sixMonth.getMonth() - 6);
  const now = new Date();
  try {
    const result = await orderSchema.aggregate([
      {
        $match: {
          createdAt: {
            $gte: sixMonth,
            $lt: now,
          },
        },
      },
      {
        $group: {
          _id: {
            bulan: { $month: "$createdAt" },
            category: "$category",
          },
          keuntungan: { $sum: "$profit" },
          jumlah: { $sum: "$amount" },
        },
      },
      {
        $sort: {
          "_id.bulan": 1,
        },
      },
    ]);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json(error);
  }
};

export const getThisMonthOrders = async (req, res) => {
  const currentMonth = new Date().getMonth() + 1;
  try {
    const orders = await orderSchema.aggregate([
      {
        $match: {
          $expr: {
            $eq: [
              { $dateToString: { format: "%Y-%m", date: "$createdAt" } },
              {
                $dateToString: { format: "%Y-%m", date: new Date() },
              },
            ],
          },
        },
      },
      {
        $project: {
          amount: 1,
          profit: 1,
          keuntungan: { $multiply: ["$amount", "$profit"] },
        },
      },
    ]);
    return res.status(200).json(orders);
  } catch (error) {
    return res.status(400).json(error);
  }
};

export const getThisWeekOrders = async (req, res) => {
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  try {
    const orders = await orderSchema.aggregate([
      {
        $match: {
          createdAt: {
            $gte: oneWeekAgo,
          },
        },
      },
      {
        $project: {
          profit: 1,
          amount: 1,
          keuntungan: { $multiply: ["$profit", "$amount"] },
        },
      },
    ]);
    return res.status(200).json(orders);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

export const getThisDayOrders = async (req, res) => {
  const start = new Date();
  start.setHours(0, 0, 0, 0);

  const end = new Date();
  end.setHours(23, 59, 59, 999);
  try {
    const result = await orderSchema.aggregate([
      {
        $match: {
          createdAt: {
            $gte: start,
            $lt: end,
          },
        },
      },
      {
        $project: {
          amount: 1,
          profit: 1,
          keuntungan: { $multiply: ["$amount", "$profit"] },
        },
      },
    ]);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const getOrdersByDate = async (req, res) => {
  const reqDate = new Date(req.body.date);
  try {
    const orders = await orderSchema.aggregate([
      {
        $match: {
          $expr: {
            $eq: [
              { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
              {
                $dateToString: { format: "%Y-%m-%d", date: new Date(reqDate) },
              },
            ],
          },
        },
      },
      {
        $group: {
          _id: { category: "$category", name: "$name", price: "$price" },
          qty: { $sum: "$amount" },
          totalPrice: { $sum: { $multiply: ["$price", "$amount"] } },
        },
      },
      {
        $project: {
          name: "$_id.name",
          qty: 1,
          price: "$_id.price",
          totalPrice: 1,
          category: "$_id.category",
        },
      },
      {
        $sort: {
          qty: -1,
          name: 1,
        },
      },
    ]);
    return res.status(200).json(orders);
  } catch (error) {
    return res.status(400).json(error);
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await orderSchema.find({}, { profit: 1, createdAt: 1 });
    return res.status(200).json(orders);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const deleteAll = async (req, res) => {
  try {
    const result = await orderSchema.deleteMany({
      user_id: "65e96365868609e8538581e4",
    });
    return res.status(200).json("berhasil hapus");
  } catch (error) {
    return res.status(400).json("gagal");
  }
};
