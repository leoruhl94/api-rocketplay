const { Model } = require ('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Schemas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // this.belongsToMany(models.Users, { as: "schema_id", through: "UsersSchemas" })
      // this.hasOne(models.Subscriptions, { as: 'schemas', foreignKey: 'schema_id' })
    }
  };
  Schemas.init({
    name: DataTypes.STRING,
    status: DataTypes.STRING,
    code: DataTypes.STRING,
    title: DataTypes.STRING,
    logoWorkspace: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Schemas',
    schema: 'public'
  });
  return Schemas;
};