import {
  Model,
  DataTypes,
  Optional,
} from 'sequelize';
import sequelize from './index';

interface IRequestList {
  requesterId: number,
  requesteeId: number,
}

class RequestList extends Model<IRequestList>
  implements IRequestList {
  public requesterId!: number;
  public requesteeId!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

RequestList.init(
  {
    requesterId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      unique: 'userSentRequest',
      allowNull: false,
    },
    requesteeId: {
      type: DataTypes.INTEGER,
      unique: 'userSentRequest',
      allowNull: false,
    },

  },
  {
    sequelize,
    tableName: 'friendRequests',
  },
);

export default RequestList;