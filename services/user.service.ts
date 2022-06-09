import { Server } from 'socket.io';
import User, { UserModel } from '../models/user.model';
import { generate, IsUrlImage } from '../lib/tools';
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

  async updateUser(userId: string, updateProps: UserDto) {
    // TODO
    // Переписать эту функцию, добавить метод проверки что ссылка являеться картинкой (Content-Type: image/png)

    if (!userId || !updateProps) {
      return this.socket.emit('user:update:error', new ResponseDto(400, 'Bad user data'));
    }

    const user = await User.findOne({ raw: true, where: { id: userId } });

    if (!user) {
      this.socket.emit('user:update:error', new ResponseDto(404, 'User not found'));
    }

    if (updateProps.avatar && !await IsUrlImage(updateProps.avatar)) {
      return this.socket.emit('user:update:error', new ResponseDto(400, 'Bad user data'));
    }

    const propsBlackList = [
      'token',
      'id',
    ];

    for (let prop in updateProps) {
      if (!propsBlackList.includes(prop)) {
        user[prop] = updateProps[prop];
      } else {
        return this.socket.emit('user:update:error', new ResponseDto(400, 'Bad user data'));
      }
    }

    await User.update(user, { where: { id: userId } });

    this.socket.emit('user:update', new ResponseDto(200, 'Success update user', new UserDto(user)));
  }

  async getUser(userId: string) {
    const user: UserModel = await User.findOne({ raw: true, where: { id: userId } });

    if (!user) {
      return this.socket.emit('user:get:error', new ResponseDto(404, 'User not found'));
    }

    this.socket.emit('user:get', new ResponseDto(200, 'Success get user', new UserDto(user)));
  }

  async deleteUser() {
    if (!this.socket['userID']) {
      this.socket.emit('chat:get-messages:error', new ResponseDto(401, 'Error, you not authorized'));
    }

    const user = await User.findOne({ where: { id: this.socket['userID'] } });

    if (!user) {
      return this.socket.emit('user:delete:error', new ResponseDto(404, 'User not found'));
    }

    await user.destroy();
    this.socket.emit('user:delete', new ResponseDto(200, 'Success delete user'));
  }
}

export default UserService;