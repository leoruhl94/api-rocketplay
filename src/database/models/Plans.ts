import { Model } from 'sequelize';

module.exports = (sequelize, DataTypes) => {
  class Plans extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Plans.belongsToMany(models.Users, { through: "UsersPlans" })
    }
  };
  Plans.init({
    Name: DataTypes.STRING,
    Description: DataTypes.TEXT,
    Price: DataTypes.ENUM,
    limitUsers: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Plans',
  });
  return Plans;
};