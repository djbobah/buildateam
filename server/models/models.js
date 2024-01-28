import sequelize from "../db.js";

import { DataTypes } from "sequelize";

const Products = sequelize.define("products", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  idProduct: { type: DataTypes.STRING },
  title: { type: DataTypes.STRING },
  bodyHtml: { type: DataTypes.JSON },
  imageSource: { type: DataTypes.STRING },
});

export default Products;
