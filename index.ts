import 'dotenv/config';
import * as express from 'express';
import { Server } from 'socket.io';
import * as path from 'path';

// * Controllers
// import Stickers from './controllers/stickers';
import UserController from './controllers/user.controller';
// import ChatController from './controllers/chat.controller';

// * Database
import sequelize from './database';

export class MainServer {
  app: express.Express;
  PORT: string | number;
  socket: Server;

  constructor() {
    this.app = express();
    this.PORT = Number(process.env.PORT) || 7000;
  }

  loadSocket() {
    this.socket.on('connection', socket => {
      // Connect controllers

      new UserController(socket);
      // new ChatController(socket);
      // new Stickers(socket, this.socket);

      // // ? Stickers
      // socket.on('sticker:add', (url: string) => stickers.add(url));
      // socket.on('stickers:get', () => stickers.list());
      // socket.on('sticker:remove', (stickerId: string) => stickers.remove(stickerId));
    });
  }

  async start() {
    this.app.use(express.static(path.resolve(__dirname, 'client')));

    this.app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client/index.html'));
    });

    try {
      await sequelize.authenticate();
      console.log('Connection to database has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }

    let server = this.app.listen(this.PORT, () => console.log(`[Jynx]: Start on http://127.0.0.1:${this.PORT}`));
    this.socket = new Server(server);

    this.loadSocket();
  }
}

new MainServer().start();