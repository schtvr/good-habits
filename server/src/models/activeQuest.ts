import {
  Model,
  DataTypes,
  Optional
} from 'sequelize';
import sequelize from './index';

interface IActiveQuest {
  id: number,
  userId: number,
  questId: number,
  taskId: number
  startDate: Date,
  progress: number,
}

interface IActiveQuestCreationAttributes extends
Optional<IActiveQuest, 'id' | 'userId' | 'questId'> {}

class ActiveQuest extends Model<IActiveQuest, IActiveQuestCreationAttributes>
implements IActiveQuest {
  public id!: number;
  public userId!: number;
  public questId!: number;
  public taskId!: number;
  public startDate!: Date;
  public progress!: number;
  
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

ActiveQuest.init(
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
    taskId: {
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
    tableName: 'activeQuests'
  }
);

export default ActiveQuest;