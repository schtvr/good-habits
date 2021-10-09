import {
  Model,
  DataTypes,
  HasManyGetAssociationsMixin,
  HasManyAddAssociationMixin,
  HasManyHasAssociationMixin,
  Association,
  HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin,
  Optional
} from 'sequelize';
import ActiveQuest from './activeQuest';
import sequelize from './index';

interface IQuest {
  id: number
  duration: number
  name: string
  description: string
  category: string
  missedCheckIn: boolean
  completionExpValue: number
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
  public missedCheckIn!: boolean;
  public completionExpValue!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  
  public getActiveQuests!: HasManyGetAssociationsMixin<ActiveQuest>;
  public addActiveQuest!: HasManyAddAssociationMixin<ActiveQuest, number>;
  public hasActiveQuest!: HasManyHasAssociationMixin<ActiveQuest, number>;
  public countActiveQuests!: HasManyCountAssociationsMixin;
  public createActiveQuest!: HasManyCreateAssociationMixin<ActiveQuest>;
  
  public static associations: {
    activeQuests: Association<Quest, ActiveQuest>
  };
}

Quest.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    duration: {
      type: DataTypes.INTEGER.UNSIGNED,
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
    missedCheckIn: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    completionExpValue: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    }
  },
  {
    sequelize,
    tableName: 'quests'
  }
);

export default Quest;