import { Server } from 'socket.io';
import FileSystem, { ConnectData } from '../lib/FileSystem';
import { IUser } from '../models/user';
import UserDto from '../dtos/UserDto';


export default class Route {
  users: IUser[];
  private readonly socket: Server;
  private fs: any;

  constructor(socket) {
    this.socket = socket;
    this.fs = new FileSystem();
    this.users = this.fs.get('users');
  }

  create() {
    const token: string = this.fs.generate(24);
    const newUser = {
      id: this.fs.generate(24),
      token,
      username: `user#${this.users.length + 1}`,
      color: '#fff',
      avatar: 'https://cdn140.picsart.com/262563244016212.png?r1024x1024',
    };
    this.users.push(newUser);
    this.fs.update('users', this.users);
    this.socket.emit('user:loadUser', this.users[this.users.findIndex(obj => obj.id === newUser.id)]);
  }

  connect(data: ConnectData) {
    if (!this.users[data.token] || data.token == null) {
      this.create();
    } else {
      this.socket.emit('user:loadUser', this.users[data.token]);
    }
  }

  login(token: string) {
    const user: IUser = this.users[this.users.findIndex(obj => obj.token === token)];
    if (user) {
      this.socket.emit('user:login', user);
      this.socket['userID'] = user.id;
    } else {
      return { status: 404, message: 'User not found' };
    }
  }

  update(oldUser: IUser) {
    for (let param in oldUser) {
      this.users[this.users.findIndex(obj => obj.id === oldUser.id)][param] = oldUser[param];
    }
    this.fs.update('users', this.users);
  }

  delete() {
    // const user: IUser = Object.values(this.users).find(item => item.id === this.socket['userID']);
    // delete this.users[this.users.findIndex(obj => obj.id === user.id)];
    this.fs.update('users', this.users.filter(obj => obj.id === this.socket['userID']));
  }

  get(userId: string) {
    const user: IUser = this.users[this.users.findIndex(item => item.id === userId)];
    if (!user) return { status: 404, message: 'User not found' };
    return this.socket.emit('user:get', new UserDto(user));
  }
}