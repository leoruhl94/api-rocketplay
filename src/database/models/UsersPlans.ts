'use strict';
import { Model } from 'sequelize';
module.exports = (sequelize, DataTypes) => {
  class UsersPlans extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  UsersPlans.init({
    userId: DataTypes.INTEGER,
    planId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UsersPlans',
    schema: 'public'
  });
  return UsersPlans;
};