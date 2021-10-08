require('dotenv').config();

interface IConfig {
  PORT: string
  HOST: string
  DBUSER: string
  DBPASS: string
  DATABASE: string
  DIALECT: string
}

const config: IConfig = {
  PORT: process.env.PORT || '3000',
  HOST: process.env.HOST ||  'hostName',
  DBUSER: process.env.DBUSER || 'dbUserName',
  DBPASS: process.env.DBPASS || 'dbUserPassword',
  DATABASE: process.env.DATABASE || 'databaseName',
  DIALECT: process.env.DIALECT || 'mysql/postgres'
};

export default config;