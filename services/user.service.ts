import { Server, Socket } from 'socket.io';
import User, { UserModel } from '../models/user.model';
import { generate, IsUrlImage } from '../lib/tools';
import UserDto from '../dtos/UserDto';
import ResponseDto from '../dtos/ResponseDto';
import Message from '../models/message.model';

class UserService {
  private readonly socket: Socket;
  private readonly io: Server;

  constructor(socket, io) {
    this.socket = socket;
    this.io = io;
  }

  async createUser() {
    const users: UserModel[] = await User.findAll();

    const newUser: UserModel = await User.create({
      token: generate(),
      username: `user#${users.length + 1}`,
    });

    this.socket['userID'] = newUser['id'];

    this.socket.emit('user:create', new ResponseDto(201, 'Success create user', newUser));
  }

  async login(token: string) {
    const user = await User.findOne({ raw: true, where: { token } });

    if (user) {
      this.socket.emit('user:login', new ResponseDto(200, 'Success login user', user));
      this.socket['userID'] = user['id'];
    } else {
      this.socket.emit('user:login', ResponseDto.NotFoundError('User not found'));
    }
  }

  async updateUser(userId: string, updateProps: UserDto) {
    if (!userId || !updateProps) {
      return this.socket.emit('user:update', ResponseDto.BadRequest('Bad update props'));
    }

    const user = await User.findOne({ raw: true, where: { id: userId } });

    if (!user) {
      this.socket.emit('user:update', ResponseDto.NotFoundError('User not found'));
    }

    if (updateProps.avatar && !await IsUrlImage(updateProps.avatar)) {
      return this.socket.emit('user:update', ResponseDto.BadRequest('Bad update props'));
    }

    const hexRegex = /^#([0-9a-f]{3}){1,2}$/i;

    if (updateProps.color) {
      if (updateProps.color[0] !== '#') {
        updateProps.color = '#' + updateProps.color;
      }

      if (!hexRegex.test(updateProps.color)) {
        return this.socket.emit('user:update', ResponseDto.BadRequest('Bad update props'));
      }
    }

    const propsBlackList = [
      'token',
      'id',
    ];

    for (let prop in updateProps) {
      if (!propsBlackList.includes(prop)) {
        user[prop] = updateProps[prop];
      } else {
        return this.socket.emit('user:update', ResponseDto.BadRequest('Bad update props'));
      }
    }

    await User.update(user, { where: { id: userId } });
    await Message.update({ author: new UserDto(user) }, { where: { author: { id: userId } } });

    this.io.emit('user:update', new ResponseDto(200, 'Success update user', new UserDto(user)));
  }

  async getUser(userId: string) {
    const user: UserModel = await User.findOne({ raw: true, where: { id: userId } });

    if (!user) {
      return this.socket.emit('user:get', ResponseDto.NotFoundError("User not found"));
    }

    this.socket.emit('user:get', new ResponseDto(200, 'Success get user', new UserDto(user)));
  }

  async deleteUser(userId: string) {
    if (!userId) {
      this.socket.emit('user:delete', ResponseDto.BadRequest("Bad user id"));
    }

    const user = await User.findOne({ where: { id: userId } });

    if (!user) {
      return this.socket.emit('user:delete', ResponseDto.NotFoundError("User not found"));
    }

    await User.destroy({ where: { id: userId } });
    this.socket.emit('user:delete', new ResponseDto(200, 'Success delete user'));
  }
}

export default UserService;