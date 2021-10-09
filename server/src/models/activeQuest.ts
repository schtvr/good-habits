import {
  Model,
  DataTypes,
  Optional,
} from 'sequelize';
import sequelize from './index';
import CompletedQuest from './completedQuest';

interface IActiveQuest {
  id: number,
  userId: number,
  questId: number,
  startDate: Date,
  progress: number,
}

interface IActiveQuestCreationAttributes extends
Optional<IActiveQuest, 'id' | 'userId' | 'questId' | 'startDate'> {}

class ActiveQuest extends Model<IActiveQuest, IActiveQuestCreationAttributes>
  implements IActiveQuest {
  public id!: number;
  public userId!: number;
  public questId!: number;
  public startDate!: Date;
  public progress!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public async complete () {
    try {
      await CompletedQuest.create({
        userId: this.userId,
        questId: this.questId,
        startDate: this.startDate,
        progress: this.progress,
      });
      await ActiveQuest.destroy({
        where: {
          id: this.id,
        },
      });
      return true;
    } catch (err) {
      return false;
    }
  }
}

ActiveQuest.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    questId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date() 
    },
    progress: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    tableName: 'activeQuests',
  },
);

export default ActiveQuest;
