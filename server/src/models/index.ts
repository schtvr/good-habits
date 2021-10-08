import {
  Sequelize,
  Dialect
} from "sequelize";
//import path from 'path';
import cfg from '../config';

const sqlConfig = {
  host: cfg.HOST,
  dialect: cfg.DIALECT as Dialect,
  pool: {
    max: 25,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
};

const sequelize = new Sequelize(cfg.DATABASE, cfg.DBUSER, cfg.DBPASS, sqlConfig);
export default sequelize;
