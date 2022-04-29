import { Server } from "socket.io";
import FileSystem, { ConnectData, User } from "../lib/FileSystem";

export default class Route {
    private socket: Server;
    private fs: any;
    users: Object;

    constructor(socket) {
        this.socket = socket;
        
        this.fs = new FileSystem();
        this.users = this.fs.get('users');
    }

    create() {
        let token: String = this.fs.generate(24);
        this.users[`${token}`] = {
            id: this.fs.generate(24),
            token,
            username: `user#${Object.keys(this.users).length + 1}`,
            color: '#fff',
            avatar: 'https://cdn140.picsart.com/262563244016212.png?r1024x1024'
        }
        this.fs.update('users', this.users);
        this.socket.emit('user:loadUser', this.users[`${token}`]);
    }

    connect(data: ConnectData) {
        if (!this.users[data.token] || data.token == null) this.create();
        else this.socket.emit('user:loadUser', this.users[data.token]);
    }

    login(token: String) {
        if (this.users[`${token}`]) {
            this.socket.emit('user:login', this.users[`${token}`]);
            this.socket['userID'] = this.users[`${token}`].id;
        }
    }

    update(oldUser: User) {
        for (let param in oldUser) {
            this.users[oldUser.token][param] = oldUser[param];
        }
        this.fs.update('users', this.users);
    }

    delete() {
        let user: User = Object.values(this.users).find(item => item.id === this.socket['userID']);
        this.users[this.fs.generate(64)] = {
            id: user.id,
            username: 'Deleted user',
            avatar: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/40ddfe2a-1ef5-41c2-a0ac-08100e6f4d5a/d7tdyll-73fa24eb-a1ff-4243-89b5-480f3ec676c7.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwic3ViIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsImF1ZCI6WyJ1cm46c2VydmljZTpmaWxlLmRvd25sb2FkIl0sIm9iaiI6W1t7InBhdGgiOiIvZi80MGRkZmUyYS0xZWY1LTQxYzItYTBhYy0wODEwMGU2ZjRkNWEvZDd0ZHlsbC03M2ZhMjRlYi1hMWZmLTQyNDMtODliNS00ODBmM2VjNjc2YzcuZ2lmIn1dXX0.kybECIuUUOCPz4sZ2HD92RV8STFcU5CjcyGI9139mtQ',
            color: 'red',
            status: 'BAN'
        };
        delete this.users[user.token];
        this.fs.update('users', this.users);
    }

    get(userId: String) {
        let user: User = Object.values(this.users).find(item => item.id === userId);
        if (!user) return { status: 404 };
        delete user['token'];
        return this.socket.emit('user:get', user);
    }

    disconnect() {}
}