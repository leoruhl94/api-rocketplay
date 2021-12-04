const { Model } = require('sequelize');


module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Subscription, { as: 'subscription', sourceKey: 'mail' })
      this.belongsToMany(models.Schemas, { through: 'UsersSchemas' })
    }
  };
  Users.init({
    name: DataTypes.STRING,
    mail: DataTypes.STRING,
    youtubeChannel: DataTypes.STRING,
    isBusiness: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Users',
    schema: 'public'
  });
  return Users;
};