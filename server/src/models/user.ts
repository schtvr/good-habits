import {
  Model,
  DataTypes,
  HasManyGetAssociationsMixin,
  HasManyAddAssociationMixin,
  HasManyHasAssociationMixin,
  HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin,
  Association,
  BelongsToManyGetAssociationsMixin,
  BelongsToManyAddAssociationMixin,
  BelongsToManyHasAssociationMixin,
  BelongsToManyCountAssociationsMixin,
  BelongsToManyCreateAssociationMixin,
  Optional,
  BelongsToManyRemoveAssociationsMixin,
} from 'sequelize';
import Achievement from './achievement';
import ActiveQuest from './activeQuest';
import sequelize from './index';
import TaskHistory from './taskHistory';
import CompletedQuest from './completedQuest';
import RequestList from './requestList';
import FriendList from './friendList';

export interface IUser {
  id: number
  firstName: string
  lastName: string
  userName: string
  email: string
  password: string
  exp: number
  level: number
}

interface IUserCreationAttributes extends Optional<IUser, 'id' | 'exp' | 'level'> {}

class User extends Model<IUser, IUserCreationAttributes> implements IUser {
  public id!: number;
  public firstName!: string;
  public lastName!: string;
  public userName!: string;
  public email!: string;
  public password!: string;
  public exp!: number;
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
  
  public getCompletedQuests!: HasManyGetAssociationsMixin<CompletedQuest>;
  public addCompletedQuest!: HasManyAddAssociationMixin<CompletedQuest, number>;
  public hasCompletedQuest!: HasManyHasAssociationMixin<CompletedQuest, number>;
  public countCompletedQuests!: HasManyCountAssociationsMixin;
  public createCompletedQuest!: HasManyCreateAssociationMixin<CompletedQuest>;

  public getRequestees!: BelongsToManyGetAssociationsMixin<RequestList>;
  public addRequestees!: BelongsToManyAddAssociationMixin<RequestList, number>;
  public hasRequestee!: BelongsToManyHasAssociationMixin<RequestList, number>;
  public countRequestees!: BelongsToManyCountAssociationsMixin;
  public createRequestee!: BelongsToManyCreateAssociationMixin<RequestList>;
  public removeRequestee!: BelongsToManyRemoveAssociationsMixin<RequestList, number>;

  public getRequesters!: BelongsToManyGetAssociationsMixin<RequestList>;
  public hasRequester!: BelongsToManyHasAssociationMixin<RequestList, number>;
  public removeRequester!: BelongsToManyRemoveAssociationsMixin<RequestList, number>;

  public getFriends!: BelongsToManyGetAssociationsMixin<FriendList>;
  public addFriends!: BelongsToManyAddAssociationMixin<FriendList, number>;
  public hasFriend!: BelongsToManyHasAssociationMixin<FriendList, number>;
  public countFriends!: BelongsToManyCountAssociationsMixin;
  public createFriend!: BelongsToManyCreateAssociationMixin<FriendList>;

  public getTaskHistory!: HasManyGetAssociationsMixin<TaskHistory>;
  public addTaskHistory!: HasManyAddAssociationMixin<TaskHistory, number>;
  public hasTaskHistory!: HasManyHasAssociationMixin<TaskHistory, number>;
  public countTaskHistory!: HasManyCountAssociationsMixin;
  public createTaskHistory!: HasManyCreateAssociationMixin<TaskHistory>;

  public static associations: {
    achievements: Association<User, Achievement>,
    activeQuests: Association<User, ActiveQuest>,
    taskHistory: Association<User, TaskHistory>,
    completedQuests: Association<User, CompletedQuest>,
    requestList: Association<User, RequestList>,
    friendList: Association<User, FriendList>
  };
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
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
    exp: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    level: {
      type: DataTypes.INTEGER,
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

User.hasMany(CompletedQuest, {
  sourceKey: 'id',
  foreignKey: 'userId',
  as: 'completedQuests'
});

User.belongsToMany(User, { as: 'Friends',sourceKey: 'id', foreignKey: 'friendId', through: 'friendLists'});
User.belongsToMany(User, { as: 'Requestees', sourceKey: 'id', through: 'friendRequests', foreignKey: 'requesterId', onDelete: 'CASCADE'});
User.belongsToMany(User, { as: 'Requesters', sourceKey: 'id', through: 'friendRequests', foreignKey: 'requesteeId', onDelete: 'CASCADE'});


export default User;
