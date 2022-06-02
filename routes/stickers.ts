import { Server } from "socket.io";
import FileSystem, { Sticker } from "../lib/FileSystem";

export default class Route {
    private socket: Server;
    private io: Server;
    private fs: any;
    stickers: Sticker[];
    
    constructor(socket, io) {
        this.socket = socket;
        this.io = io;
        
        this.fs = new FileSystem();
        this.stickers = this.fs.get('stickers');
    }

    get(stickerId: string) {
        return this.stickers.find(item => item.id === stickerId);
    }

    list() {
        this.socket.emit('stickers:list', this.stickers);
    }

    add(url: string) {
        let data: Sticker = {
            id: this.fs.generate(18),
            url,
            ownerId: this.socket['userID'],
            date: Date.now()
        }
        this.stickers.push(data);
        this.fs.update('stickers', this.stickers);
    }

    remove(stickerId: string) {
        let sticker: Sticker = this.get(stickerId);
        if (!sticker?.id) return { status: 404 };
        if (sticker.ownerId !== this.socket['userID']) return { status: 401 };
        this.stickers = this.stickers.filter(item => item.id !== sticker.id);
        this.fs.update('stickers', this.stickers);
    }
}