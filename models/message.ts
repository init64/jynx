import { IUser } from './user';

export interface IMessage {
  content: string,
  id: string,
  type: string,
  user: IUser | string,
  date: number,
  edited?: boolean
}

export interface ISticker {
  id: string,
  url: string,
  ownerId: string,
  date: number
}