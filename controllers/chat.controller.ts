import { Server } from 'socket.io';
import ChatService from '../services/chat.service';

export default class ChatController {
  private readonly socket: Server;
  private readonly ChatService: ChatService;

  constructor(socket) {
    this.socket = socket;
    this.ChatService = new ChatService(this.socket);

    // ? Chat
    this.socket.on('chat:get-messages', this.ChatService.getMessages);
    // this.socket.on('chat:get-message', this.ChatService.getMessage);
    this.socket.on('chat:send-message', this.ChatService.sendMessage);

    // ? Message
    this.socket.on('message:update', this.ChatService.updateMessage);
    this.socket.on('message:delete', this.ChatService.deleteMessage);
  }
}