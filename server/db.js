// import config from "config";

import { Sequelize } from "sequelize";

// const sequelize = new Sequelize("sqlite::memory:"); // Example for sqlite
export default new Sequelize({
  dialect: "sqlite",
  storage: "./db.sqlite3",
});
