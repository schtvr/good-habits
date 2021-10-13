import {
  Model,
  DataTypes,
  Optional,
} from 'sequelize';
import sequelize from './index';

interface ITaskHistory {
  id: number,
  userId: number,
  taskId: number,
  questId: number,
  completedDate: Date | null,
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
  public completedDate!: Date | null;
  public completed!: boolean;
  public textInput!: string;
  public userPicture!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

TaskHistory.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      unique: 'userTask',
      allowNull: false,
    },
    taskId: {
      type: DataTypes.INTEGER,
      unique: 'userTask',
      allowNull: false,
    },
    questId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    completedDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    completed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    textInput: {
      type: new DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ''
    },
    userPicture: {
      type: new DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ''
    },
  },
  {
    sequelize,
    tableName: 'taskHistory',
  },
);

export default TaskHistory;
