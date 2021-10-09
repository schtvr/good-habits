import {
  Model,
  DataTypes,
  Optional
} from 'sequelize';
import sequelize from './index';

interface ITaskHistory {
  id: number,
  userId: number,
  taskId: number,
  questId: number,
  completedDate: Date,
  completed: boolean,
  textInput: string,
  userPicture: string,
}

interface ITaskHistoryCreationAttributes extends
Optional<ITaskHistory, 'id'> {}

class TaskHistory extends Model<ITaskHistory, ITaskHistoryCreationAttributes>
implements ITaskHistory {
  public id!: number;
  public userId!: number;
  public taskId!: number;
  public questId!: number;
  public completedDate!: Date;
  public completed!: boolean;
  public textInput!: string;
  public userPicture!: string;
  
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

TaskHistory.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },
    taskId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },
    EXPValue: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },
    nextTaskHistoryId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },
    previousTaskHistoryId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },

  },
  {
    sequelize,
    tableName: 'taskHistory'
  }
);

export default TaskHistory;