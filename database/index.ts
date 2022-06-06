import * as sqlite3 from 'sqlite3';
import * as path from 'path';

sqlite3.verbose();

const DB_SOURCE = path.resolve(__dirname, 'jynx.db');

const db = new sqlite3.Database(DB_SOURCE, (err) => {
  if (err) {
    console.error(err.message);
    throw err;
  } else {
    console.log('Connected to the SQLite database.');
  }
});

export default db;