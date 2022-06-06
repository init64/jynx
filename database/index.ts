import * as sqlite3 from 'sqlite3';

sqlite3.verbose();

const DB_SOURCE = 'db.sqlite';

const db = new sqlite3.Database(DB_SOURCE, (err) => {
  if (err) {
    console.error(err.message);
    throw err;
  } else {
    console.log('Connected to the SQLite database.');
  }
});

export default db;