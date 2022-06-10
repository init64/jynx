import { Server, Socket } from 'socket.io';
import Message, { MessageModel } from '../models/message.model';
import ResponseDto from '../dtos/ResponseDto';
import User, { UserModel } from '../models/user.model';
import UserDto from '../dtos/UserDto';

class ChatService {
  private readonly socket: Socket;
  private readonly io: Server;

  constructor(socket, io) {
    this.socket = socket;
    this.io = io;
  }

  async getMessage(messageId: string) {
    const message = await Message.findOne({ raw: true, where: { id: messageId } });

    if (!message) {
      this.socket.emit('message:get', new ResponseDto(404, 'Message not found', message));
    } else {
      this.socket.emit('message:get', new ResponseDto(200, 'Success get message', message));
    }
  }

  async getMessages() {
    if (!this.socket['userID']) {
      this.socket.emit('chat:get-messages:error', new ResponseDto(401, 'Error, you not authorized'));
    }

    const messages = await Message.findAll();

    this.socket.emit('chat:get-messages', new ResponseDto(200, 'Success get messages', messages));
  }

  async sendMessage(body: string, type: string = 'message') {
    if (!this.socket['userID']) {
      this.socket.emit('chat:send-message:error', new ResponseDto(401, 'Error, you not authorized'));
    }

    const user: UserModel = await User.findOne({ where: { id: this.socket['userID'] } });

    if (!user) {
      return this.socket.emit('chat:send-message:error', new ResponseDto(404, 'User not found'));
    }

    const newMessage = await Message.create({
      content: body,
      type,
      author: new UserDto(user),
    });

    this.io.emit('chat:new-message', new ResponseDto(200, 'Success get new message', newMessage));
  }

  async updateMessage(messageId: string, content: string) {
    const message: MessageModel = await Message.findOne({ raw: true, where: { id: messageId } });

    if (!message) {
      return this.socket.emit('chat:update-message:error', new ResponseDto(200, 'Message not found'));
    }

    // if (message['author']['id'] !== this.socket['userID']) {
    //   console.log("Permission denied");
    //   return this.socket.emit('chat:update-message:error', new ResponseDto(401, 'Permission denied'));
    // }

    await Message.update({ content }, { where: { id: messageId } });
    this.io.emit('chat:update-message', new ResponseDto(200, 'Success update message', { ...message, content }));
  }

  async deleteMessage(messageId: string) {
    const message: MessageModel = await Message.findOne({ raw: true, where: { id: messageId } });

    if (!message) {
      return this.socket.emit('chat:delete-message:error', new ResponseDto(200, 'Message not found'));
    }

    // if (message.get('author')['id'] !== this.socket['userID']) {
    //   return this.socket.emit('chat:delete-message:error', new ResponseDto(401, 'Permission denied'));
    // }

    await Message.destroy({ where: { id: messageId } });
    this.io.emit('chat:delete-message', new ResponseDto(200, 'Success delete message', message));
  }
}

export default ChatService;