import { Sequelize, DataTypes, Options } from "sequelize";

// import config from "../config/config";
const config = require("../config/config")
import fs from "fs"
import path from "path"


const basename = path.basename(__filename);
;
console.log("postgres: ", config.dbUser)
// const URI = `postgres://${config.dbUser}:${config.dbPassword}@${config.dbHost}/${config.dbName}`
const URI = config.dbUrl;




const options: Options = {
    dialect: "postgres",
    logging: false,
    dialectOptions: {},
  };
  if (config.isProd) {
    options.dialectOptions = {
      ssl: {
        rejectUnauthorized: false,
      },
    };
    options.logging = false;
  }
  

const sequelize = new Sequelize( URI, options );


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

module.exports = {
  ...sequelize.models,
  conn: sequelize
}

