import { Server } from 'socket.io';
import UserService from '../services/user.service';

export default class UserController {
  private readonly socket: Server;
  private readonly UserService: UserService;

  constructor(socket) {
    this.socket = socket;
    this.UserService = new UserService(socket);

    this.socket.on('user:create', () => this.UserService.createUser());
    this.socket.on('user:login', (token) => this.UserService.login(token));
    this.socket.on('user:update', (oldUser) => this.UserService.updateUser(oldUser));
    this.socket.on('user:get', (userId) => this.UserService.getUser(userId));
    this.socket.on('user:delete', () => this.UserService.deleteUser());
  }
}