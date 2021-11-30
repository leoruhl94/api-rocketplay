// require("dotenv").config();
// const { Sequelize } = require("sequelize");
// const { config } = require("../config/config");
// const setupModels = require("../db/models/index");

// const options = {
//   dialect: "postgres",
//   logging: false
// };
// if (config.isProd) {
//   options.dialectOptions = {
//     ssl: {
//       rejectUnauthorized: false,
//     },
//   };
//   options.logging = false;
// }

// const sequelize = new Sequelize(config.dbUrl, options);

// setupModels(sequelize);

// // sequelize.sync({ force: true });  // activar para modo desarrollo

// module.exports = sequelize;
