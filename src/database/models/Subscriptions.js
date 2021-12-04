const { Model } = require ('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Subscriptions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
  
    // this.belongsTo(models.Plans, { as: 'plan'})
    // Subscriptions.belongsTo(models.Users, { foreignKey: 'id' })
    this.belongsTo(models.Schemas, { as: 'schema',  foreignKey: 'schema_id'})
    }
  };
  Subscriptions.init({
    id:{type: DataTypes.STRING, primaryKey: true }, //id del pago (mp)
    status: DataTypes.STRING,
    schema_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Subscriptions',
    schema: 'public'
  });
  return Subscriptions
};