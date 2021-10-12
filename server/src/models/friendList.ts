import {
  Model,
  DataTypes,
  Optional,
} from 'sequelize';
import sequelize from './index';

interface IFriendList {
  id: number,
  FriendId: number,
}

class FriendList extends Model<IFriendList>
  implements IFriendList {
  public id!: number;
  public FriendId!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

FriendList.init(
  {
    id: {
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
    tableName: 'friends',
  },
);

export default FriendList;