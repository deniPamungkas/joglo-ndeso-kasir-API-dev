import invoiceSchema from "../models/invoice.js";
import invoiceNameSchema from "../models/invoice-name.js";

export const addInvoice = async (req, res) => {
  try {
    const isMenuSame = await invoiceSchema.findOne({
      name: req.body.name,
      menuName: req.body.menuName,
      category: req.body.category,
      price: req.body.price,
    });

    if (!isMenuSame) {
      const newInvoice = new invoiceSchema({
        name: req.body.name,
        menuName: req.body.menuName,
        category: req.body.category,
        amount: 1,
        price: req.body.price,
      });

      const result = await newInvoice.save();
      return res
        .status(200)
        .json({ message: "Success adding new invoice", data: result });
    } else {
      isMenuSame.amount += 1;
      const result = await isMenuSame.save();
      return res
        .status(200)
        .json({ message: "Success to increase amount", data: result });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "internal server error", error: error });
  }
};

export const getInvoice = async (req, res) => {
  try {
    const invoice = await invoiceSchema.find({ name: req.query.name });
    if (!invoice.length) {
      return res.status(200).json({ message: "Data not found", data: invoice });
    }
    return res.status(200).json({ message: "Success", data: invoice });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "internal server error", error: error });
  }
};

export const deleteInvoice = async (req, res) => {
  try {
    const result = await invoiceSchema.findOneAndDelete({
      _id: req.query.id,
    });
    if (!result) {
      return res.status(200).json({ message: "Data not found", data: result });
    }
    return res.status(200).json({ message: "Success", data: result });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "internal server error", error: error });
  }
};

export const updateInvoice = async (req, res) => {
  try {
    const result = await invoiceSchema.findOneAndUpdate(
      {
        name: req.body.name,
        menuName: req.body.menuName,
      },
      { $inc: { amount: -1 } },
      { new: true }
    );
    if (!result) {
      return res.status(200).json({ message: "Data not found", data: result });
    }
    return res.status(200).json({ message: "Success", data: result });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "internal server error", error: error });
  }
};

export const addInvoiceName = async (req, res) => {
  try {
    const newInvoiceName = new invoiceNameSchema({
      name: req.body.name,
    });

    const result = await newInvoiceName.save();
    return res
      .status(200)
      .json({ message: "Success adding new invoice name", data: result });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "internal server error", error: error });
  }
};

export const getInvoiceName = async (req, res) => {
  try {
    const invoiceName = await invoiceNameSchema.find({ name: req.query.name });
    if (!invoiceName.length) {
      return res.status(200).json({
        message: `Name ${req.query.name} is available`,
        data: invoiceName,
      });
    }
    return res.status(409).json({
      message: `Name ${req.query.name} is already exist`,
      data: invoiceName,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "internal server error", error: error });
  }
};

export const getInvoiceNameById = async (req, res) => {
  try {
    const invoiceName = await invoiceNameSchema.findById(req.params.id);
    if (!invoiceName) {
      return res.status(404).json({
        message: `Name is not exist`,
        data: invoiceName,
      });
    }
    return res.status(200).json({
      message: `Name is exist`,
      data: invoiceName,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "internal server error", error: error });
  }
};

export const deleteInvoiceName = async (req, res) => {
  try {
    const result = await invoiceNameSchema.findOneAndDelete({
      _id: req.query.id,
    });
    if (!result) {
      return res.status(200).json({ message: "Data not found", data: result });
    }
    await invoiceSchema.deleteMany({ name: result.name });
    return res.status(200).json({ message: "Success", data: result });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "internal server error", error: error });
  }
};

export const getInvoiceNames = async (req, res) => {
  try {
    const invoices = await invoiceNameSchema.find({}, { name: 1 });
    if (!invoices.length) {
      return res
        .status(404)
        .json({ message: "Data not found!", data: invoices });
    } else {
      return res.status(200).json({ message: "Success", data: invoices });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "internal server error", error: error });
  }
};
