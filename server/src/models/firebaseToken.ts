import {
  Model,
  DataTypes,
  Optional,
} from 'sequelize';
import sequelize from './index';

interface IFirebaseToken {
  userId: number,
  firebaseId: string,
}

class FirebaseToken extends Model<IFirebaseToken>
  implements IFirebaseToken {
  public userId!: number;
  public firebaseId!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

FirebaseToken.init(
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

export default FirebaseToken;