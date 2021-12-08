const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Plans extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) { 
      
      this.hasMany(models.Subscriptions, { 
        as: 'subscriptions', foreignKey: 'plan_id'})
    }
  };
  Plans.init({
  id: {type: DataTypes.STRING, primaryKey: true }, // id (mp)
    name: DataTypes.STRING,  //reason (mp)
    description: DataTypes.TEXT,
    price: DataTypes.INTEGER, //(auto_recurring) transaction_amount
    userLimit: DataTypes.INTEGER,
    link_checkout: DataTypes.STRING, //init_point (mp)
    status: DataTypes.STRING, //status (mp)
    back_url: DataTypes.STRING, //back_url (mp)
  }, {
    sequelize,
    modelName: 'Plans',
    schema: 'public'
  });
  return Plans;
};

