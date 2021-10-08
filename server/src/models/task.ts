import {
  Model,
  DataTypes,
  Optional
} from 'sequelize';
import sequelize from './index';

interface ITask {
  id: number,
  questId: number,
  taskDescription: string,
  EXPValue: number,
  nextTaskId: number,
  previousTaskId: number,
}

interface ITaskCreationAttributes extends
Optional<ITask, 'id'> {}

class Task extends Model<ITask, ITaskCreationAttributes>
implements ITask {
  public id!: number;
  public questId!: number;
  public taskDescription!: string;
  public EXPValue!: number;
  public nextTaskId!: number;
  public previousTaskId!: number;
  
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Task.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    questId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },
    taskDescription: {
      type:  new DataTypes.STRING(1000),
      allowNull: false
    },
    EXPValue: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },
    nextTaskId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },
    previousTaskId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },

  },
  {
    sequelize,
    tableName: 'tasks'
  }
);

export default Task;