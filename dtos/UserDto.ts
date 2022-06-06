import { IUser } from '../models/user';

class UserDto {
  id: string;
  username: string;
  color: string;
  avatar: string;

  constructor(model: IUser) {
    this.id = model.id;
    this.username = model.username;
    this.color = model.color;
    this.avatar = model.avatar;
  }
}

export default UserDto;