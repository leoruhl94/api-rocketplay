import { Model } from 'sequelize';

module.exports = (sequelize, DataTypes) => {
  class Schemas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Schemas.belongsToMany(models.Users, { through: "UsersSchemas" })
    }
  };
  Schemas.init({
    Name: DataTypes.STRING,
    Id: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'Schemas',
  });
  return Schemas;
};