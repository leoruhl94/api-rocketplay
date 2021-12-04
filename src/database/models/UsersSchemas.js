'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UsersSchemas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  UsersSchemas.init({
    user_id: DataTypes.STRING,
    schema_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UsersSchemas',
    schema: 'public'
  });
  return UsersSchemas;
};