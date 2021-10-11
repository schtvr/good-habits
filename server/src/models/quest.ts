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
import ActiveQuest from './activeQuest';
import Task from './task';
import sequelize from './index';

interface IQuest {
  id: number
  duration: number
  name: string
  description: string
  category: string
  completionExp: number
}

interface IQuestCreationAttributes extends
Optional<IQuest, 'id'> {}

class Quest extends Model<IQuest, IQuestCreationAttributes>
  implements IQuest {
  public id!: number;
  public duration!: number;
  public name!: string;
  public description!: string;
  public category!: string;
  public completionExp!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public getActiveQuests!: HasManyGetAssociationsMixin<ActiveQuest>;
  public addActiveQuest!: HasManyAddAssociationMixin<ActiveQuest, number>;
  public hasActiveQuest!: HasManyHasAssociationMixin<ActiveQuest, number>;
  public countActiveQuests!: HasManyCountAssociationsMixin;
  public createActiveQuest!: HasManyCreateAssociationMixin<ActiveQuest>;

  public getTasks!: HasManyGetAssociationsMixin<Task>;
  public addTask!: HasManyAddAssociationMixin<Task, number>;
  public hasTask!: HasManyHasAssociationMixin<Task, number>;
  public countTasks!: HasManyCountAssociationsMixin;
  public createTask!: HasManyCreateAssociationMixin<Task>;

  public static associations: {
    activeQuests: Association<Quest, ActiveQuest>,
    tasks: Association<Quest, Task>
  };
}

Quest.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    description: {
      type: new DataTypes.STRING(1000),
      allowNull: false,
    },
    category: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    completionExp: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'quests',
  },
);

Quest.hasMany(Task, {
  sourceKey: 'id',
  foreignKey: 'questId',
  as: 'tasks',
});

Quest.hasMany(ActiveQuest, {
  sourceKey: 'id',
  foreignKey: 'questId',
  as: 'activeQuests',
});

export default Quest;
