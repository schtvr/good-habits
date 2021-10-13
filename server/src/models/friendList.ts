import {
  Model,
  DataTypes,
  Optional,
} from 'sequelize';
import sequelize from './index';

interface IFriendList {
  FriendId: number,
  UserId: number,
}

class FriendList extends Model<IFriendList>
  implements IFriendList {
  public FriendId!: number;
  public UserId!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

FriendList.init(
  {
    FriendId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
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