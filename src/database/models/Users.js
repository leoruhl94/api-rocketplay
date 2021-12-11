const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // // define association here

      this.hasMany(models.Subscriptions, {
        as: "subscriptions",
        foreignKey: "user_id",
      });
      this.belongsToMany(models.Schemas, {
        as: "schemas",
        through: "UsersSchemas",
        foreignKey: "user_id",
        otherKey: "schema_id",
      });
      // this.belongsToMany(models.Genres, {
      //   as: "genres",
      //   through: models.VideogamesGenres,
      //   foreignKey: "videogameId",
      //   otherKey: "genreId",
      //   timestamps: false,
      // });
    }
  }
  Users.init(
    {
      name: DataTypes.STRING,
      mail: { type: DataTypes.STRING, primaryKey: true },
      youtubeChannel: DataTypes.STRING,
      isBusiness: DataTypes.BOOLEAN,
      workspaces: DataTypes.ARRAY(DataTypes.STRING),
    },
    {
      sequelize,
      modelName: "Users",
      schema: "public",
    }
  );
  return Users;
};
