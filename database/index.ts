import * as path from 'path';
import { Sequelize } from 'sequelize';

const DB_SOURCE = path.resolve(__dirname, 'jynx.db');

const sequelize = new Sequelize('database',{
  dialect: 'sqlite',
  storage: DB_SOURCE,
});

export default sequelize;
