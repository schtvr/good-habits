import {
  Model,
  DataTypes,
  Optional,
} from 'sequelize';
import sequelize from './index';

interface IFriendList {
  requesterId: number,
  requesteeId: number,
}

class FriendList extends Model<IFriendList>
  implements IFriendList {
  public requesterId!: number;
  public requesteeId!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

FriendList.init(
  {
    requesterId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    requesteeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

  },
  {
    sequelize,
    tableName: 'friendRequests',
  },
);

export default FriendList;