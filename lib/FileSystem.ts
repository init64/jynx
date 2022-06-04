import * as fs from 'fs';
import { join } from 'path';

export interface ConnectData {
  token: string
}

export default class FileSystem {
  generate = (length = 24) => {
    const symbols = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    return new Array(length).fill(symbols).map(x => x[Math.floor(Math.random() * x.length)]).join('');
  };

  get(name: string): any {
    const data = fs.readFileSync(this.path(`../json/${name}.json`), { encoding: 'utf-8' });
    return JSON.parse(data);
  }

  update(name: string, data: any, dir: string = '../json') {
    return fs.writeFile(`${this.path(dir)}/${name}.json`, JSON.stringify(data), { encoding: 'utf-8' }, err => err ? console.log(err) : null);
  }

  isFolders(folders: string[], dir: string = '..') {
    for (let folder of folders) {
      fs.access(`${this.path(dir)}/${folder}`, err => err ? fs.mkdirSync(`${this.path(dir)}/${folder}`) : null);
    }
  }

  isFiles(files: any[], dir: string = '../json') {
    for (let file of files) {
      fs.access(`${this.path(dir)}/${file[0]}`, err => err ? fs.writeFileSync(`${this.path(dir)}/${file[0]}`, file[1], { encoding: 'utf-8' }) : null);
    }
  }

  private path(path) {
    return join(__dirname, path);
  }
}