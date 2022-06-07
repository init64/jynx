import { Socket } from 'socket.io';
import ChatService from '../services/chat.service';

export default class ChatController {
  private readonly socket: Socket;
  private readonly ChatService: ChatService;

  constructor(socket, io) {
    this.socket = socket;
    this.ChatService = new ChatService(this.socket, io);

    // ? Chat
    this.socket.on('chat:get-messages', () => this.ChatService.getMessages());
    // this.socket.on('chat:get-message', this.ChatService.getMessage);
    this.socket.on('chat:send-message', (body, type) => this.ChatService.sendMessage(body, type));

    // ? Message
    this.socket.on('message:update', (messageId, content) => {
      console.log("DATA FROM CLIENT ON TOP LEVEL - ", messageId, content);
      this.ChatService.updateMessage(messageId, content);
    });
    this.socket.on('message:delete', (messageId) => this.ChatService.deleteMessage(messageId));
  }
}