import { Socket } from 'socket.io';
import UserService from '../services/user.service';

export default class UserController {
  private readonly socket: Socket;
  private readonly UserService: UserService;

  constructor(socket, io) {
    this.socket = socket;
    this.UserService = new UserService(socket, io);

    this.socket.on('user:create', () => this.UserService.createUser());
    this.socket.on('user:login', (token) => this.UserService.login(token));
    this.socket.on('user:update', (userId, updateProps) => this.UserService.updateUser(userId, updateProps));
    this.socket.on('user:get', (userId) => this.UserService.getUser(userId));
    this.socket.on('user:delete', (userId) => this.UserService.deleteUser(userId));
  }
}