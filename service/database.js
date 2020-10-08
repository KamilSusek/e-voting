const sqlite3 = require("sqlite3").verbose();

// open the database
let db = new sqlite3.Database("./db/voters.db");

let sql = `SELECT * FROM voters`;

db.each(
  `CREATE TABLE voters(
    voter_id BIGINT PRIMARY KEY,
    login VARCHAR(40),
    password VARCHAR(50));`,
  (err, row) => {
    if (err) {
      console.log(err.message);
    }
  }
);

db.each(
  `INSERT INTO voters(voter_id, login, password) VALUES(0, 'u1','p1234');`,
  (err, row) => {
    if (err) {
      console.log(err.message);
    }
  }
);

db.each(
  `INSERT INTO voters(voter_id, login, password) VALUES(1, 'u2','p1234');`,
  (err, row) => {
    if (err) {
      console.log(err.message);
    }
  }
);

db.each(
  `INSERT INTO voters(voter_id, login, password) VALUES(2, 'u3','p1234');`,
  (err, row) => {
    if (err) {
      console.log(err.message);
    }
  }
);

db.each(sql, (err, row) => {
  if (err) {
    console.log(err.message);
  }
  console.log(`${row.login}`);
});

// close the database connection
db.close();
