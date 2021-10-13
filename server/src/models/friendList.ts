import {
  Model,
  DataTypes,
  Optional,
} from 'sequelize';
import sequelize from './index';

interface IFriendList {
  friendId: number,
  FriendId: number,
}

class FriendList extends Model<IFriendList>
  implements IFriendList {
  public friendId!: number;
  public FriendId!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

FriendList.init(
  {
    friendId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    FriendId: {
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