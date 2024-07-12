import Joi from "joi";

//validate is the data structure match
export const validateOrder = async (req, res, next) => {
  const validationOrderSchema = Joi.object({
    name: Joi.string().trim().required(),
    category: Joi.string().trim().required(),
    amount: Joi.number().required(),
    price: Joi.number().required(),
    profit: Joi.number().required(),
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
    return res
      .status(403)
      .json({ message: "not validated data structure", error: error.message });
  }
};
