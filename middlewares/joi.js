import Joi from "joi";
import invoiceNameSchema from "../models/invoice-name.js";

//validate is the data structure match in product data model
export const validateProduct = async (req, res, next) => {
  const validationOrderSchema = Joi.object({
    name: Joi.string().lowercase().trim().required(),
    category: Joi.string().lowercase().trim().required(),
    price: Joi.number().required(),
    profit: Joi.number().required(),
  });
  try {
    const { error } = validationOrderSchema.validate(req.body);
    if (error) {
      throw new Error(error.details[0].message);
    }
    req.body = validationOrderSchema.validate(req.body).value;
    next();
  } catch (error) {
    return res.status(403).json({
      message: "not validated data structure of order",
      error: error.message,
    });
  }
};

//validate is the data structure match in order data model
export const validateOrder = async (req, res, next) => {
  const validationOrderSchema = Joi.object({
    name: Joi.string().trim().required(),
    menuName: Joi.string().trim().required(),
    category: Joi.string().trim().required(),
    amount: Joi.number().required(),
    price: Joi.number().required(),
  });
  try {
    req.body.data.map((order) => {
      const { error } = validationOrderSchema.validate(order);
      if (error) {
        throw new Error(error.details[0].message);
      }
    });
    next();
  } catch (error) {
    return res.status(403).json({
      message: "not validated data structure of order",
      error: error.message,
    });
  }
};

//validate is the data structure match in invoice data model
export const validateInvoice = async (req, res, next) => {
  const validationInvoiceSchema = Joi.object({
    name: Joi.string().trim().required(),
    menuName: Joi.string().trim().required(),
    category: Joi.string().trim().required(),
    amount: Joi.number().required(),
    price: Joi.number().required(),
  });
  try {
    const { error } = validationInvoiceSchema.validate(req.body);
    if (error) {
      throw new Error(error.details[0].message);
    }
    next();
  } catch (error) {
    return res.status(403).json({
      message: "not validated to invoice data structure",
      error: error.message,
    });
  }
};

//validate is the data structure match in invoice-name data model
export const validateInvoiceName = async (req, res, next) => {
  const invoiceName = await invoiceNameSchema.find({ name: req.body.name });
  if (!invoiceName.length) {
    const validationInvoiceSchema = Joi.object({
      name: Joi.string().trim().required(),
    });
    try {
      const { error } = validationInvoiceSchema.validate(req.body);
      if (error) {
        throw new Error(error.details[0].message);
      }
      next();
    } catch (error) {
      return res.status(403).json({
        message: "not validated to invoice-name data structure",
        error: error.message,
      });
    }
  } else {
    return res.status(409).json({
      message: `Name ${req.body.name} is already exist`,
      data: invoiceName,
    });
  }
};
