import { Server } from 'socket.io';
import Message, { MessageModel } from '../models/message.model';
import ResponseDto from '../dtos/ResponseDto';
import User, { UserModel } from '../models/user.model';
import UserDto from '../dtos/UserDto';

class ChatService {
  private readonly socket: Server;

  constructor(socket) {
    this.socket = socket;
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
    const messages = await Message.findAll();

    this.socket.emit('chat:get-messages', new ResponseDto(200, 'Success get messages', messages));
  }

  async sendMessage(body: string, type: string = 'message') {
    const user: UserModel = await User.findOne({ where: { id: this.socket['userID'] } });

    if (!user) {
      return this.socket.emit('chat:send-message:error', new ResponseDto(404, 'User not found'));
    }

    const newMessage = await Message.create({
      content: body,
      type,
      author: new UserDto(user),
    });

    this.socket.emit('chat:send-message', new ResponseDto(200, 'Success send message', newMessage));
  }

  async updateMessage(messageId: string, content: string) {
    const message: MessageModel = await Message.findOne({ raw: true, where: { id: messageId } });

    if (!message) {
      return this.socket.emit('chat:update-message:error', new ResponseDto(200, 'Message not found'));
    }

    if (message.get('author')['id'] !== this.socket['userID']) {
      return this.socket.emit('chat:update-message:error', new ResponseDto(401, 'Permission denied'));
    }

    message.set('content', content);

    await message.save();
  }

  async deleteMessage(messageId: string) {
    const message: MessageModel = await Message.findOne({ raw: true, where: { id: messageId } });

    if (!message) {
      return this.socket.emit('chat:delete-message:error', new ResponseDto(200, 'Message not found'));
    }

    if (message.get('author')['id'] !== this.socket['userID']) {
      return this.socket.emit('chat:delete-message:error', new ResponseDto(401, 'Permission denied'));
    }

    await message.destroy();
  }
}

export default ChatService;