const { Table, TableSchema } = require("./Example");


function setupModels(sequelize) {
  Table.init(TableSchema, Table.config(sequelize)); //inicializo en sequelize

  Table.associate(sequelize.models);    //creo las relaciones
}

module.exports = setupModels;