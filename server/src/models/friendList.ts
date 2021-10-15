import {
  Model,
  DataTypes,
  Optional,
} from 'sequelize';
import sequelize from './index';

interface IFriendList {
  id: number
  FriendId: number,
  UserId: number,
}

interface IFriendCreationAttributes extends Optional<IFriendList, 'id'> {}

class FriendList extends Model<IFriendList, IFriendCreationAttributes>
  implements IFriendList {
  public id!: number;
  public FriendId!: number;
  public UserId!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

FriendList.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    FriendId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

  },
  {
    sequelize,
    tableName: 'friendLists',
  },
);

export default FriendList;