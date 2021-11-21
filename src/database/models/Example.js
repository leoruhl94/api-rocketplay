const { DataTypes, Model, Sequelize } = require("sequelize");

const TABLE_TABLE = "table_name";

const TableSchema = { // esquema de la tabla
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
};

class Table extends Model {
  static associate(models) {
      /// aqui se hacen las relaciones
  }

  static config(sequelize) { //este metodo es para la configuracion e inicializacionde sequelize
    return {
      sequelize,
      tableName: TABLE_TABLE,
      modelName: "Table",
      timestamps: false,
    };
  }
}

module.exports = {
  Table,
  TableSchema,
  TABLE_TABLE,
};
