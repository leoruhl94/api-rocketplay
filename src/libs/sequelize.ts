require("dotenv").config();
import { Sequelize } from "sequelize";
import { config } from "../config/config";
import fs from "fs"
import path from "path"

const basename = path.basename(__filename);

const modelDefiners = []

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

const sequelize = new Sequelize(config.dbUrl);

// sequelize.sync({ force: true });  // activar para modo desarrollo

fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.ts'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
});
  
modelDefiners.forEach(model =>{ 
  model(sequelize);
  model.asociate(modelDefiners);
});



module.exports = {
  ...sequelize.models,
  conn: sequelize
};

