"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Subscriptions", {
      // id: {
      //   allowNull: false,
      //   autoIncrement: true,
      //   primaryKey: true,
      //   type: Sequelize.INTEGER,
      // },
      id: {
        primaryKey: true,
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.STRING,
      },
      plan_id: {
        field: "plan_id",
        type: Sequelize.STRING,
        refereces: {
          model: "Plans",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      user_id: {
        field: "user_id",
        type: Sequelize.STRING,
        refereces: {
          model: "Users",
          key: "mail",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      schema_id: {
        field: "schema_id",
        type: Sequelize.INTEGER,
        refereces: {
          model: "Schema",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Subscriptions");
  },
};
