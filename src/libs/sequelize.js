
const {Sequelize, DataTypes} = require("sequelize")
const config = require("../config/config");
const fs = require("fs")
const path =  require("path")
const basename = path.basename(__filename);


const URI = config.dbUrl;




const options = {
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
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => { 
  const model = require(path.join(__dirname.slice(0,-5), '/database/models', file));
  const modelo = model(sequelize,DataTypes);
  modelDefiners[file] = modelo;
});

Object.keys(modelDefiners).forEach(modelName => {
  if (modelDefiners[modelName].associate) {
      modelDefiners[modelName].associate(sequelize.models);
    }
});

module.exports = {
  ...sequelize.models,
  conn: sequelize
}

