import Products from "../models/models.js";

export const getAllProducts = async (req, res) => {
  const products = await Products.findAll();
  return res.json(products);
};
