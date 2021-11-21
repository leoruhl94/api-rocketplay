'use strict';
const {TableSchema, TABLE_TABLE } = require('./../models/example')


module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable( TABLE_TABLE ,TableSchema);

  },

  down: async (queryInterface, Sequelize) => {
      await queryInterface.dropTable(TABLE_TABLE);

  }
};
