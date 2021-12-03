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
    Subscriptions.belongsTo(models.Users, { foreignKey: 'user_id' })
    Subscriptions.hasOne(models.Schemas, { foreignKey: 'schema_id' })
    Subscriptions.belongsTo(models.Plans, { foreignKey: 'plan_id' })
    }
  };
  Subscriptions.init({
    subscription_id: DataTypes.STRING, //id del pago (mp)
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Subscription',
    schema: 'public'
  });
  return Schemas;
};