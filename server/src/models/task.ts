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
import sequelize from './index';
import TaskHistory from './taskHistory';

interface ITask {
  id: number,
  questId: number,
  description: string,
  expValue: number,
  index: number,
}

interface ITaskCreationAttributes extends
Optional<ITask, 'id' | 'questId'> {}

class Task extends Model<ITask, ITaskCreationAttributes>
  implements ITask {
  public id!: number;
  public questId!: number;
  public description!: string;
  public expValue!: number;
  public index!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public getTaskHistory!: HasManyGetAssociationsMixin<TaskHistory>;
  public addTaskHistory!: HasManyAddAssociationMixin<TaskHistory, number>;
  public hasTaskHistory!: HasManyHasAssociationMixin<TaskHistory, number>;
  public countTaskHistory!: HasManyCountAssociationsMixin;
  public createTaskHistory!: HasManyCreateAssociationMixin<TaskHistory>;

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
    description: {
      type: new DataTypes.STRING(1000),
      allowNull: false,
    },
    expValue: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    index: {
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
