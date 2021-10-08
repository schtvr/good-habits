import {
  Model,
  DataTypes,
  Optional
} from 'sequelize';
import sequelize from './index';

interface ICompletedQuest {
  id: number,
  userId: number,
  questId: number,
  startDate: Date,
  progress: number,
}

interface ICompletedQuestCreationAttributes extends
Optional<ICompletedQuest, 'id' | 'userId' | 'questId'> {}

class CompletedQuest extends Model<ICompletedQuest, ICompletedQuestCreationAttributes>
implements ICompletedQuest {
  public id!: number;
  public userId!: number;
  public questId!: number;
  public startDate!: Date;
  public progress!: number;
  
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

CompletedQuest.init(
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
    questId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    progress: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 0
    }
  },
  {
    sequelize,
    tableName: 'completedQuests'
  }
);

export default CompletedQuest;