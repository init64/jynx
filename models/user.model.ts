import sequelize from '../database';
import * as Sequelize from 'sequelize';
import { DataTypes, Model } from 'sequelize';

export interface IUser {
  id: string;
  token: string;
  username: string;
  color: string;
  avatar: string;
}

export type UserModel = Model<IUser>;

const User = sequelize.define('user', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  token: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  color: {
    type: DataTypes.STRING,
    defaultValue: '#fff',
  },
  avatar: {
    type: DataTypes.STRING,
    defaultValue: 'https://cdn140.picsart.com/262563244016212.png?r1024x1024',
  },
}, {
  tableName: 'users',
  timestamps: true,
});

User.sync();

export default User;