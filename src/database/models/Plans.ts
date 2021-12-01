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
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    price: DataTypes.INTEGER,
    userLimit: DataTypes.INTEGER,
    subscriptionMP: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Plans',
    schema: 'public'
  });
  return Plans;
};