import {
  Model,
  DataTypes,
  Optional,
} from 'sequelize';
import sequelize from './index';

interface IFireBaseTokens {
  userId: number,
  firebaseId: string,
}

class FireBaseTokens extends Model<IFireBaseTokens>
  implements IFireBaseTokens {
  public userId!: number;
  public firebaseId!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

FireBaseTokens.init(
  {
    userId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    firebaseId: {
      type: new DataTypes.STRING(4096),
      allowNull: false,
    },

  },
  {
    sequelize,
    tableName: 'firebaseTokens',
  },
);

export default FireBaseTokens;