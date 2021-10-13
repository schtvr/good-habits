import {
  Model,
  DataTypes,
  HasManyGetAssociationsMixin,
  HasManyAddAssociationMixin,
  HasManyHasAssociationMixin,
  Association,
  HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin,
  Optional,
} from 'sequelize';
import { IUpdate } from '../interfaces/Update';
import sequelize from './index';
import TaskHistory from './taskHistory';

interface ITask {
  id: number,
  questId: number,
  name: string,
  description: string,
  completionExp: number,
  index: number,
  day: number,
}

interface ITaskCreationAttributes extends
Optional<ITask, 'id' | 'questId'> {}

class Task extends Model<ITask, ITaskCreationAttributes>
  implements ITask {
  public id!: number;
  public questId!: number;
  public name!: string;
  public description!: string;
  public completionExp!: number;
  public index!: number;
  public day!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public getTaskHistory!: HasManyGetAssociationsMixin<TaskHistory>;
  public addTaskHistory!: HasManyAddAssociationMixin<TaskHistory, number>;
  public hasTaskHistory!: HasManyHasAssociationMixin<TaskHistory, number>;
  public countTaskHistory!: HasManyCountAssociationsMixin;
  public createTaskHistory!: HasManyCreateAssociationMixin<TaskHistory>;
  
  public async complete (userId: number, done: boolean) {
    const completedTask = await this.createTaskHistory({
      userId,
      questId: this.questId,
      completed: done ? true : false
    });
    return completedTask;
  }

  public static associations: {
    taskHistory: Association<Task, TaskHistory>
  };
}

Task.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    questId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: new DataTypes.STRING(255),
      allowNull: false,
    },
    description: {
      type: new DataTypes.STRING(1000),
      allowNull: false,
    },
    completionExp: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    index: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    day: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'tasks',
  },
);

Task.hasMany(TaskHistory, {
  sourceKey: 'id',
  foreignKey: 'taskId',
  as: 'taskHistory'
});

export default Task;
