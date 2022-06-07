import { Server } from 'socket.io';
import User, { IUser, UserModel } from '../models/user.model';
import generate from '../lib/generate';
import UserDto from '../dtos/UserDto';
import ResponseDto from '../dtos/ResponseDto';

class UserService {
  private readonly socket: Server;

  constructor(socket) {
    this.socket = socket;
  }

  async createUser() {
    const users: UserModel[] = await User.findAll();

    const newUser: UserModel = await User.create({
      token: generate(),
      username: `user#${users.length + 1}`,
    });

    this.socket['userID'] = newUser['id'];

    this.socket.emit('user:create', new ResponseDto(200, 'Success create user', newUser));
  }

  async login(token: string) {
    const user = await User.findOne({ raw: true, where: { token } });

    if (user) {
      this.socket.emit('user:login', new ResponseDto(200, 'Success login user', user));
      this.socket['userID'] = user['id'];
    } else {
      this.socket.emit('user:login:error', new ResponseDto(404, 'User not found'));
    }
  }

  async updateUser(oldUser: IUser) {
    const user = await User.findOne({ raw: true, where: { id: oldUser.id } });

    if (!user) {
      this.socket.emit('user:update:error', new ResponseDto(404, 'User not found'));
    }

    for (let param in oldUser) {
      user[param] = oldUser[param];
    }

    await user.save();

    this.socket.emit('user:update', user);
  }

  async getUser(userId: string) {
    const user: UserModel = await User.findOne({ raw: true, where: { id: userId } });

    if (!user) {
      return this.socket.emit('user:get:error', new ResponseDto(404, 'User not found'));
    }

    this.socket.emit('user:get', new UserDto(user));
  }

  async deleteUser() {
    const user = await User.findOne({ where: { id: this.socket['userID'] } });

    if (!user) {
      return this.socket.emit('user:delete:error', new ResponseDto(404, 'User not found'));
    }

    await user.destroy();
    this.socket.emit('user:delete', new ResponseDto(200, 'Success delete user'));
  }
}

export default UserService;