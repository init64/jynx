import 'dotenv/config'
import * as express from 'express';
import { Server } from "socket.io";
import * as path from 'path';
import * as fs from 'fs';

// * Lib
import FileSystem from './lib/FileSystem';

// * Routes
import Users from './routes/users';
import Messages from './routes/messages';

export class MainServer {
    app: express.Express;
    PORT: String;
    socket: Server;
    fs: any;
    FS: any;
    
    constructor() {
        this.app = express();
        this.PORT = process.env.PORT || '7000';

        this.fs = fs;
        this.FS = new FileSystem();

        this.socket;
    }
    
    loadSocket() {
        this.socket.on('connection', socket => {
            const users = new Users(socket);
            const messages = new Messages(socket, this.socket);

            // ? Users
            // socket.on('user:connect', (data: any) => users.connect(data));
            socket.on('user:create', () => users.create());
            socket.on('user:login', (data: any) => users.login(data));
            socket.on('user:update', (data: any) => users.update(data));
            socket.on('user:get', (userId: string) => users.get(userId));
            socket.on('user:delete', () => users.delete());

            // ? Chat
            socket.on('chat:getMessages', () => messages.list());
            socket.on('chat:sendMessage', (data: any) => messages.sendMessage(data));

            // ? Message
            socket.on('message:delete', (messageId: String) => messages.deleteMessage(messageId));
        });
    }

    start() {
        this.FS.isFolders(['json']);
        this.FS.isFiles([
            ['users.json', '{}'],
            ['messages.json', '[]']
        ]);

        this.app.use('/', express.static(path.join(__dirname, (process.env.DIST || '/dist'))));

        let server = this.app.listen(this.PORT, () => console.log(`[Jynx]: Start http://localhost:${this.PORT}`));
        this.socket = new Server(server);

        this.loadSocket();
    }
}

new MainServer().start();