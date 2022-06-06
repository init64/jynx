import UserDto from '../dtos/UserDto';

export interface IMessage {
  content: string,
  id: string,
  type: string,
  author: UserDto,
  date: number | string,
  edited?: boolean
}

export interface ISticker {
  id: string,
  url: string,
  ownerId: string,
  date: number
}