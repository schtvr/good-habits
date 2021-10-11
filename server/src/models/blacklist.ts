import {
  Model,
  Optional,
  DataTypes
} from 'sequelize';
import sequelize from './index';

interface IBlacklist {
  id: number
  jwt: string
}

interface IBlacklistCreationAttributes extends 
Optional<IBlacklist, 'id'> {}

class Blacklist extends Model<IBlacklist, IBlacklistCreationAttributes>
  implements IBlacklist {
  public id!: number;
  public jwt!: string;
  
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Blacklist.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    jwt: {
      type: new DataTypes.STRING(255),
      allowNull: false
    }
  },
  {
    sequelize,
    tableName: 'Blacklist'
  }
);

export default Blacklist;
