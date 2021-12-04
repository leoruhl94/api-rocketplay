
const {Sequelize, DataTypes} = require("sequelize")
// const setupModels = require('./setupModels')
const config = require("../config/config");
const fs = require("fs")
const path =  require("path")


const basename = path.basename(__filename);

// const URI = `postgres://${config.dbUser}:${config.dbPassword}@${config.dbHost}/${config.dbName}`
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

console.log(sequelize.models)

Object.keys(modelDefiners).forEach(modelName => {
  if (modelDefiners[modelName].associate) {
      modelDefiners[modelName].associate(sequelize.models);
      console.log("Se esta haciendo las asociaciones de: ", modelDefiners[modelName])
    }
});
  // setupModels(sequelize, DataTypes)
  // const Plans = require("../database/models/Plans");
  // const Schemas = require("../database/models/Schemas");
  // const Subscriptions = require("../database/models/Subscriptions");
  // const Users = require("../database/models/Users");
  // const UsersSchemas = require("../database/models/UsersSchemas");
  
  // ///_____________________
  
  // function setupModels(sequelize, DataTypes) {
    
    
    
    
    
  //   let Plans = Plans(sequelize, DataTypes);
  //   let Subscriptions = Subscriptions(sequelize, DataTypes);
  //   let Schemas = Schemas(sequelize, DataTypes);
  //   let Users = Users(sequelize, DataTypes);
  //   let UsersSchemas = UsersSchemas(sequelize, DataTypes);
    
  //   //__________________________
  //   Plans.associate(sequelize.models);
  //   Subscriptions.associate(sequelize.models);
  //   Schemas.associate(sequelize.models);
  //   Users.associate(sequelize.models);
  //   UsersSchemas.associate(sequelize.models);
  // }
  






module.exports = {
  ...sequelize.models,
  conn: sequelize
}

