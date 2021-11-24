require("dotenv").config();
import { Sequelize, DataTypes } from "sequelize";
import { dbUser, dbName, dbPassword, dbHost } from "../config/config";
import fs from "fs"
import path from "path"

const basename = path.basename(__filename);

const modelDefiners = {}

// Sigue abierta la conexión. Tenés que cerrarla
const options = {
  dialect: "postgres",
  logging: false
};
// if (config.isProd) {
//   options.dialectOptions = {
//     ssl: {
//       rejectUnauthorized: false,
//     },
//   };
//   options.logging = false;
// }

const sequelize = new Sequelize(`postgres://${dbUser}:${dbPassword}@${dbHost}/${dbName}`,{
  dialect: "postgres",
  logging: false
});

// sequelize.sync({ force: true });  // activar para modo desarrollo

fs.readdirSync(path.join('C:\\Users\\rosym\\Desktop\\PF HENRY\\Rocket\\api-rocketplay\\src\\database\\models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.ts'))
  .forEach((file) => {
  const model = require(path.join('C:\\Users\\rosym\\Desktop\\PF HENRY\\Rocket\\api-rocketplay\\src\\database\\models', file));
    modelDefiners[model.name] = model;
});
  
// modelDefiners.forEach(model =>{ 
//   model(sequelize, DataTypes).associate(modelDefiners);
// });
Object.keys(modelDefiners).forEach(modelName => {
  modelDefiners[modelName](sequelize,DataTypes);
  if (modelDefiners[modelName].associate) {
    modelDefiners[modelName].associate(modelDefiners);
  }
});
module.exports = {
  ...sequelize.models,
  conn: sequelize
};

