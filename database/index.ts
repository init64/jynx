import * as path from 'path';
import { Sequelize } from 'sequelize';

const DB_SOURCE = path.resolve(__dirname, 'jynx.db');

const sequelize = new Sequelize('database', 'root', 'Qawsed781',{
  dialect: 'sqlite',
  storage: DB_SOURCE,
});

export default sequelize;