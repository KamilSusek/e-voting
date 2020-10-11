"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
const DBSOURCE = "db.sqlite";

const CREATE_USERS_TABLE = `CREATE TABLE users(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username text UNIQUE,
            password text
            )`;

const CREATE_ELECTIONS_TABLE = `CREATE TABLE elections(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            electionTitle text UNIQUE,
            description text,
            user_id INTEGER REFERENCES users(id)
            )`;

const CREATE_OPTIONS_TABLE = `CREATE TABLE options(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name text,
            election_id INTEGER REFERENCES elections(id)
            )`;

const insert = "INSERT INTO users (username,  password) VALUES (?,?)";

const db = new sqlite3.Database(DBSOURCE);

db.run(CREATE_USERS_TABLE);
db.run(CREATE_ELECTIONS_TABLE);
db.run(CREATE_OPTIONS_TABLE);

db.get("SELECT * FROM users", (err, row) => {
  console.log(row);
});

db.close();*/
exports.default = db;
//# sourceMappingURL=database.js.map