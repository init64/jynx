import { Server } from 'socket.io';
import FileSystem from '../lib/FileSystem';
import { IMessage } from '../models/message';
import { IUser } from '../models/user';

export default class Route {
  messages: IMessage[];
  private readonly socket: Server;
  private io: Server;
  private fs: any;
  private readonly users: object;

  constructor(socket, io) {
    this.socket = socket;
    this.io = io;

    this.fs = new FileSystem();
    this.messages = this.fs.get('messages');
    this.users = this.fs.get('users');
  }

  getMessage(messageId: string) {
    return this.messages.find(item => item.id === messageId);
  }

  getUser(userId: string) {
    return Object.values(this.users).find(item => item.id === userId);
  }

  list() {
    let messages: IMessage[] = [],
      users = Object.values(this.users);
    for (let message of this.messages) {
      let user: IUser = users.find(item => item.id === message.user);
      if (user?.token) delete user['token'];
      if (user) messages = [...messages, { ...message, user }];
    }
    this.socket.emit('chat:loadMessages', messages);
  }

  async sendMessage(body: string, type: string = 'message') {
    let user = await this.getUser(this.socket['userID']);
    let data: IMessage = {
      content: body,
      id: this.fs.generate(18),
      type,
      user: user.id,
      date: Date.now(),
    };
    this.messages.push(data);
    this.fs.update('messages', this.messages);
    this.io.emit('chat:addMessage', { ...data, user });
  }

  updateMessage(messageId: string, content: string) {
    let message: IMessage = this.getMessage(messageId);
    if (!message?.id) return { status: 404 };
    if (message.user !== this.socket['userID']) return { status: 401 };
    message['content'] = content;
    message['edited'] = true;
    this.fs.update('messages', this.messages);
    this.io.emit('message:update', message);
  }

  deleteMessage(messageId: string) {
    let message: IMessage = this.getMessage(messageId);
    if (!message?.id) return { status: 404 };
    if (message.user !== this.socket['userID']) return { status: 401 };
    this.messages = this.messages.filter(item => item.id !== message.id);
    this.fs.update('messages', this.messages);
    this.io.emit('message:delete', message.id);
  }
}