import { Sequelize, DataTypes } from "sequelize";

import config from "../config/config";
import fs from "fs"
import path from "path"


const basename = path.basename(__filename);
const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const URI = `postgres://${config.dbUser}:${config.dbPassword}@${config.dbHost}/${config.dbName}`


const sequelize = new Sequelize( URI,{
  dialect: "postgres",
  logging: false,
});


const modelDefiners = {}


fs.readdirSync(path.join(__dirname.slice(0,-5),'/database/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.ts'))
  .forEach((file) => {
  const model = require(path.join(__dirname.slice(0,-5), '/database/models', file));
  modelDefiners[file] = model;
});



Object.keys(modelDefiners).forEach(modelName => {
  modelDefiners[modelName](sequelize,DataTypes);
  if (modelDefiners[modelName].associate) {
    modelDefiners[modelName].associate(modelDefiners);
  }
});

modelDefiners["Sequelize"] = Sequelize;
modelDefiners["sequelize"] = sequelize;

module.exports = {
  modelDefiners
};

