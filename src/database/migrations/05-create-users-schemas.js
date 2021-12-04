'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('UsersSchemas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        field: "user_id",
        type: Sequelize.STRING,
        references: {
          model: "Users",
          key: "mail"
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL"
      },
      schema_id: {
        fied: "schema_id",
        type: Sequelize.INTEGER,
        references: {
          model: "Schemas",
          key: "id"
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL"
        
      }
      ,
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('UsersSchemas');
  }
};