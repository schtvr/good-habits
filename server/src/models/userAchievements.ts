import {
  Model,
  DataTypes,
} from 'sequelize';

import sequelize from './index';
export interface IUserAchievements {
  id: number
  userId: number
  achievementId: number
}

class UserAchievements extends Model<IUserAchievements> implements IUserAchievements {
  public id!: number;
  public userId!: number
  public achievementId!: number
  
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

UserAchievements.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    achievementId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'userAchievements',
  }
);

export default UserAchievements;
