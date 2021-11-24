import { Model } from 'sequelize';


module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Users.belongsToMany(models.Plans, { through: "UsersPlans"})
      Users.belongsToMany(models.Schemas, { through: "UsersSchemas"})
    }
  };
  Users.init({
    name: DataTypes.STRING,
    mail: DataTypes.STRING,
    password: DataTypes.STRING,
    youtubeChannel: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Users',
  });
  return Users;
};