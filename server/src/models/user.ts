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
import Achievement from './achievement';
import ActiveQuest from './activeQuest';
import sequelize from './index';
import TaskHistory from './taskHistory';

export interface IUser {
  id: number
  firstName: string
  lastName: string
  userName: string
  email: string
  password: string
  Exp: number
  level: number
}

interface IUserCreationAttributes extends Optional<IUser, 'id' | 'Exp' | 'level'> {}

class User extends Model<IUser, IUserCreationAttributes> implements IUser {
  public id!: number;
  public firstName!: string;
  public lastName!: string;
  public userName!: string;
  public email!: string;
  public password!: string;
  public Exp!: number;
  public level!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public getAchievements!: HasManyGetAssociationsMixin<Achievement>;
  public addAchievement!: HasManyAddAssociationMixin<Achievement, number>;
  public hasAchievement!: HasManyHasAssociationMixin<Achievement, number>;
  public countAchievements!: HasManyCountAssociationsMixin;
  public createAchievement!: HasManyCreateAssociationMixin<Achievement>;

  public getActiveQuests!: HasManyGetAssociationsMixin<ActiveQuest>;
  public addActiveQuest!: HasManyAddAssociationMixin<ActiveQuest, number>;
  public hasActiveQuest!: HasManyHasAssociationMixin<ActiveQuest, number>;
  public countActiveQuests!: HasManyCountAssociationsMixin;
  public createActiveQuest!: HasManyCreateAssociationMixin<ActiveQuest>;

  public getTaskHistory!: HasManyGetAssociationsMixin<TaskHistory>;
  public addTaskHistory!: HasManyAddAssociationMixin<TaskHistory, number>;
  public hasTaskHistory!: HasManyHasAssociationMixin<TaskHistory, number>;
  public countTaskHistory!: HasManyCountAssociationsMixin;
  public createTaskHistory!: HasManyCreateAssociationMixin<TaskHistory>;

  public static associations: {
    achievements: Association<User, Achievement>,
    activeQuests: Association<User, ActiveQuest>,
    taskHistory: Association<User, TaskHistory>
  };
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    firstName: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    lastName: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    userName: {
      type: new DataTypes.STRING(128),
      allowNull: false,
      unique: true,
    },
    email: {
      type: new DataTypes.STRING(128),
      allowNull: false,
      unique: true,
    },
    password: {
      type: new DataTypes.STRING(255),
      allowNull: false,
    },
    Exp: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
    },
    level: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 1,
    },
  },
  {
    tableName: 'users',
    sequelize,
  },
);

User.hasMany(Achievement, {
  sourceKey: 'id',
  foreignKey: 'userId',
  as: 'achievements',
});

User.hasMany(ActiveQuest, {
  sourceKey: 'id',
  foreignKey: 'userId',
  as: 'activeQuests'
});

User.hasMany(TaskHistory, {
  sourceKey: 'id',
  foreignKey: 'userId',
  as: 'taskHistory'
});

export default User;
