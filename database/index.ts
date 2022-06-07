import * as path from 'path';
import { Sequelize } from 'sequelize';

const DB_SOURCE = path.resolve(__dirname, 'jynx.db');

const sequelize = new Sequelize('database', process.env.DB_USERNAME, process.env.DB_PASSWORD,{
  dialect: 'sqlite',
  storage: DB_SOURCE,
});

export default sequelize;
