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
import Stickers from './routes/stickers';

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
            const
                users = new Users(socket),
                messages = new Messages(socket, this.socket),
                stickers = new Stickers(socket, this.socket);

            // ? Users
            // socket.on('user:connect', (data: any) => users.connect(data));
            socket.on('user:create', () => users.create());
            socket.on('user:login', (data: any) => users.login(data));
            socket.on('user:update', (data: any) => users.update(data));
            socket.on('user:get', (userId: string) => users.get(userId));
            socket.on('user:delete', () => users.delete());

            // ? Chat
            socket.on('chat:getMessages', () => messages.list());
            socket.on('chat:sendMessage', (content: any, type: string) => messages.sendMessage(content, type));

            // ? Messages
            socket.on('message:update', (messageId: string, content: string) => messages.updateMessage(messageId, content));
            socket.on('message:delete', (messageId: string) => messages.deleteMessage(messageId));

            // ? Stickers
            socket.on('sticker:add', (url: string) => stickers.add(url));
            socket.on('stickers:get', () => stickers.list());
            socket.on('sticker:remove', (stickerId: string) => stickers.remove(stickerId));
        });
    }

    start() {
        this.FS.isFolders(['json']);
        this.FS.isFiles([
            ['users.json', '{}'],
            ['messages.json', '[]'],
            ['stickers.json', '[]']
        ]);

        this.app.use(express.static(path.resolve("./") + "/dist"));

        this.app.get('*', (req, res) => {
            res.sendFile(path.resolve("./") + "/dist/index.html");
        });

        let server = this.app.listen(this.PORT, () => console.log(`[Jynx]: Start http://localhost:${this.PORT}`));
        this.socket = new Server(server);

        this.loadSocket();
    }
}

new MainServer().start();