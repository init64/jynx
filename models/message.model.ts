import UserDto from '../dtos/UserDto';
import * as Sequelize from 'sequelize';
import { DataTypes, Model } from 'sequelize';
import sequelize from '../database';

export interface IMessage {
  id: string;
  content: string;
  type: string;
  author: UserDto;
}

export type MessageModel = Model<IMessage>;

export interface ISticker {
  id: string;
  url: string;
  ownerId: string;
  date: number;
}

const Message = sequelize.define('message', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'message',
  },
  author: {
    type: DataTypes.JSON,
    allowNull: false,
  },
}, {
  tableName: 'messages',
  timestamps: true,
});

Message.sync();

export default Message;