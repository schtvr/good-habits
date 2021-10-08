import {
  Model,
  DataTypes,
  HasManyGetAssociationsMixin,
  HasManyAddAssociationMixin,
  HasManyHasAssociationMixin,
  Association,
  HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin,
} from 'sequelize';
import UserAchievements from './userAchievements';
import sequelize from './index';

interface IUser {
  id: number
  firstName: string
  lastName: string
  userName: string
  email: string
  password: string
  EXP: number
  level: number
}

class User extends Model<IUser> implements IUser {
  public id!: number;
  public firstName!: string;
  public lastName!: string;
  public userName!: string;
  public email!: string;
  public password!: string;
  public EXP!: number;
  public level!: number;
  
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  
  public getAchievements!: HasManyGetAssociationsMixin<UserAchievements>;
  public addAchievement!: HasManyAddAssociationMixin<UserAchievements, number>;
  public hasAchievement!: HasManyHasAssociationMixin<UserAchievements, number>;
  public countAchievements!: HasManyCountAssociationsMixin;
  public createAchievement!: HasManyCreateAssociationMixin<UserAchievements>;
  
  public static associations: {
    userAchievements: Association<User, UserAchievements>
  }
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
      allowNull: false
    },
    lastName: {
      type: new DataTypes.STRING(128),
      allowNull: false
    },
    userName: {
      type: new DataTypes.STRING(128),
      allowNull: false
    },
    email: {
      type: new DataTypes.STRING(128),
      allowNull: false 
    },
    password: {
      type: new DataTypes.STRING(255),
      allowNull: false,
    },
    EXP: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
    },
    level: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 1
    },
  },
  {
    tableName: 'users',
    sequelize,
  }
);

User.hasMany(UserAchievements, {
  sourceKey: 'id',
  foreignKey: 'userId',
  as: 'userAchievements'
});

export default User;
