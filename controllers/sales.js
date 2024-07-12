import orderSchema from "../models/order.js";

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
            nama: "$name",
            profit: "$profit",
          },
          jumlah: { $sum: "$amount" },
        },
      },
      {
        $project: {
          _id: 0,
          bulan: "$_id.bulan",
          nama: "$_id.nama",
          profit: "$_id.profit",
          jumlah: 1,
          keuntungan: { $multiply: ["$_id.profit", "$jumlah"] },
        },
      },
      {
        $sort: {
          jumlah: -1,
        },
      },
    ]);
    return res.status(200).json({ data: result });
  } catch (error) {
    return res.status(400).json({ error: error });
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
            year: { $dateToString: { format: "%Y", date: "$createdAt" } },
            category: "$category",
          },
          keuntungan: { $sum: "$profit" },
          jumlah: { $sum: "$amount" },
        },
      },
      {
        $project: {
          _id: 0,
          bulan: "$_id.bulan",
          tahun: "$_id.year",
          category: "$_id.category",
          keuntungan: 1,
          jumlah: 1,
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

export const getThisYearOrders = async (req, res) => {
  try {
    const orders = await orderSchema.aggregate([
      {
        $match: {
          $expr: {
            $eq: [
              { $dateToString: { format: "%Y", date: "$createdAt" } },
              {
                $dateToString: { format: "%Y", date: new Date() },
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

export const getThisMonthOrders = async (req, res) => {
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
        $group: {
          _id: {
            time: "$createdAt",
            name: "$name",
            profit: "$profit",
          },
          qty: { $sum: "$amount" },
        },
      },
      {
        $project: {
          _id: 0,
          time: "$_id.time",
          name: "$_id.name",
          profit: "$_id.profit",
          qty: 1,
          keuntungan: { $multiply: ["$_id.profit", "$qty"] },
        },
      },
      {
        $sort: {
          tinggal: 1,
        },
      },
    ]);
    return res.status(200).json({ data: result });
  } catch (error) {
    return res.status(500).json({ error: error });
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
    const orders = await orderSchema.find();
    return res.status(200).json({ message: "success get sales", data: orders });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "failed get sales", error: "internal server error" });
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
