import {
  Model,
  DataTypes,
  Optional,
} from 'sequelize';
import sequelize from './index';

interface IRequestList {
  id: number,
  requesterId: number,
  requesteeId: number,
}
interface IRequestListCreationAttributes extends
Optional<IRequestList, 'id'> {}
class RequestList extends Model<IRequestList, IRequestListCreationAttributes>
  implements IRequestList {
  public id!: number;
  public requesterId!: number;
  public requesteeId!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

RequestList.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    requesterId: {
      type: DataTypes.INTEGER,
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