import {
  Model,
  DataTypes,
  Optional,
} from 'sequelize';

import sequelize from './index';
export interface IAchievement {
  id: number
  userId: number
  templateId: number
}
interface IAchievementCreationAttributes extends Optional<IAchievement, 'id' | 'userId' | 'templateId'> {}

class Achievement extends Model<IAchievement, IAchievementCreationAttributes>
  implements IAchievement {
  public id!: number;
  public userId!: number
  public templateId!: number

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Achievement.init(
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
    templateId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'achievements',
  },
);

export default Achievement;
