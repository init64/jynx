import { Server } from "socket.io";
import FileSystem from "../lib/FileSystem";

interface User {
    id: string,
    token: string,
    username: string,
    color: string,
    avatar: string
}

interface Message {
    content: string,
    id: string,
    user: User | string,
    date: number
}



export default class Route {
    private socket: Server;
    private io: Server;
    private fs: any;
    messages: Message[];
    private users: Object;
    
    constructor(socket, io) {
        this.socket = socket;
        this.io = io;
        
        this.fs = new FileSystem();
        this.messages = this.fs.get('messages');
        this.users = this.fs.get('users');
    }

    getMessage(messageId: String) {
        return this.messages.find(item => item.id === messageId);
    }

    getUser(userId: String) {
        return Object.values(this.users).find(item => item.id === userId);
    } 

    list() {
        let messages: Message[] = [],
            users = Object.values(this.users);
        for (let message of this.messages) {
            let user: User = users.find(item => item.id === message.user);
            if (user?.token) delete user['token'];
            if (user) messages = [ ...messages, { ...message, user } ];
        }
        this.socket.emit('chat:loadMessages', messages);
    }

    async sendMessage(body: string) {
        let user = await this.getUser(this.socket['userID']);
        let data: Message = {
            content: body,
            id: this.fs.generate(18),
            user: user.id,
            date: Date.now()
        }
        this.messages.push(data);
        this.fs.update('messages', this.messages);
        this.io.emit('chat:addMessage', { ...data, user });
    }

    deleteMessage(messageId: String) {
        let message: Message = this.getMessage(messageId);
        if (!message?.id) return { status: 404 };
        if (message.user !== this.socket['userID']) return { status: 401 };
        this.messages = this.messages.filter(item => item.id !== message.id);
        this.fs.update('messages', this.messages);
        this.io.emit('message:delete', message.id);
    }
}