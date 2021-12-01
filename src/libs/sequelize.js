
const {Sequelize, DataTypes} = require("sequelize")

const config = require("../config/config");
const fs = require("fs")
const path =  require("path")


const basename = path.basename(__filename);

// const URI = `postgres://${config.dbUser}:${config.dbPassword}@${config.dbHost}/${config.dbName}`
const URI = config.dbUrl;




const options = {
    dialect: "postgres",
    // logging: false,
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

