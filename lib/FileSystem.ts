import * as fs from 'fs';
import { join } from 'path';


export interface ConnectData {
    token: string
}

export interface User {
    id: string,
    token: string,
    username: string,
    color: string,
    avatar: string
}

export interface Message {
    content: string,
    id: string,
    type: string,
    user: User | string,
    date: number,
    edited?: boolean
}

export interface Sticker {
    id: string,
    url: string,
    ownerId: string,
    date: number
}


export default class FileSystem {
    constructor() {}

    generate = (length = 24) => new Array(length).fill(`0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz`).map(x => x[Math.floor(Math.random() * x.length)]).join('');

    get(name: String): any {
        let data = fs.readFileSync(this.path(`../json/${name}.json`), { encoding: 'utf-8' });
        return JSON.parse(data);
    }

    update(name: String, data: any, dir: String = '../json') {
        return fs.writeFile(`${this.path(dir)}/${name}.json`, JSON.stringify(data), { encoding: 'utf-8' }, err => err ? console.log(err) : null);
    }

    private path(path) {
        return join(__dirname, path);
    }

    isFolders(folders: String[], dir: String = '..') {
        for (let folder of folders) {
            fs.access(`${this.path(dir)}/${folder}`, err => err ? fs.mkdirSync(`${this.path(dir)}/${folder}`) : null);
        }
    }

    isFiles(files: any[], dir: String = '../json') {
        for (let file of files) {
            fs.access(`${this.path(dir)}/${file[0]}`, err => err ? fs.writeFileSync(`${this.path(dir)}/${file[0]}`, file[1], { encoding: 'utf-8' }) : null);
        }
    }
}