"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Subscriptions", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      subscription_id: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.STRING,
      },
      plan_id: {
        field: "plan_id",
        allowNull: false,
        type: DataTypes.INTEGER,
        refereces: {
          model: "Plans",
          key: "plan_id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      user_id: {
        field: "user_id",
        allowNull: false,
        type: DataTypes.INTEGER,
        refereces: {
          model: "Users",
          key: "user_id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      schema_id: {
        field: "schema_id",
        allowNull: false,
        type: DataTypes.INTEGER,
        refereces: {
          model: "Schema",
          key: "shcema_id",
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
