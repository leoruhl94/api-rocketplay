import {
  Model, UUIDV4
} from 'sequelize';

interface PlansAttributes {
  id: string;
  name: string;
  description: string;
  price: number;
  userLimit: number;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Plans extends Model<PlansAttributes> 
  implements PlansAttributes {
     id!: string;
     name!: string;
     description!: string;
     price!: number;
     userLimit!: number;
    static associate(models: any) {
      Plans.belongsToMany(models.Project, {
        through: 'UsersPlans'
      })
    }
  };
  Plans.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true
    }, 
    price: {
      type: DataTypes.ENUM(100, 250, 300),
      allowNull: false
    }, 
    userLimit: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Plans',
  });
  return Plans;
};
