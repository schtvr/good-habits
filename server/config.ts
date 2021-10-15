require('dotenv').config();

interface IConfig {
  PORT: string
  HOST: string
  DBUSER: string
  DBPASS: string
  DATABASE: string
  DIALECT: string
  ENV: string
  SECRET: string
}

const config: IConfig = {
  PORT: process.env.PORT || '3000',
  HOST: process.env.HOST ||  'hostName',
  DBUSER: process.env.DBUSER || 'dbUserName',
  DBPASS: process.env.DBPASS || 'dbUserPassword',
  DATABASE: 'databaseName',
  DIALECT: process.env.DIALECT || 'mysql/postgres',
  ENV: process.env.ENV || 'test',
  SECRET: process.env.SECRET || 'notverysecretkeylol',
};

if (config.ENV === 'test') {
  config.DATABASE = 'testHabits';
} else config.DATABASE = process.env.DATABASE || 'test';

export default config;