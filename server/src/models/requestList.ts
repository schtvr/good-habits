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

export default RequestList;