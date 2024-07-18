import { Router } from "express";
import { authenticateToken } from "../middlewares/jwt.js";
import { validateInvoice, validateInvoiceName } from "../middlewares/joi.js";
import {
  addInvoice,
  addInvoiceName,
  deleteInvoice,
  deleteInvoiceName,
  getInvoice,
  getInvoiceName,
  getInvoiceNameById,
  getInvoiceNames,
  updateInvoice,
} from "../controllers/invoice.js";

const route = Router();

route.post("/", authenticateToken, validateInvoice, addInvoice);
route.get("/", authenticateToken, getInvoice);
route.delete("/", authenticateToken, deleteInvoice);
route.patch("/", authenticateToken, updateInvoice);
route.post(
  "/invoice-name",
  authenticateToken,
  validateInvoiceName,
  addInvoiceName
);
route.get("/invoice-name", authenticateToken, getInvoiceName);
route.get("/invoice-name/:id", authenticateToken, getInvoiceNameById);
route.delete("/invoice-name", authenticateToken, deleteInvoiceName);
route.get("/invoice-names", authenticateToken, getInvoiceNames);

export default route;
