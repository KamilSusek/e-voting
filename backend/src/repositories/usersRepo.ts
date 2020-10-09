import sqlite3 from "sqlite3";
const DBSOURCE = "db.sqlite";

const CREATE_USERS_TABLE = `CREATE TABLE users(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username text UNIQUE,
  password text
  )`;

const CREATE_ELECTIONS_TABLE = `CREATE TABLE elections(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  electionTitle text UNIQUE,
  description text
  )`;

const CREATE_USER_ELECTION_TABLE = `CREATE TABLE user_election(
  user_id INTEGER  REFERENCES users(id),
  election_id INTEGER  REFERENCES elections(id)
    )`;

const CREATE_OPTIONS_TABLE = `CREATE TABLE options(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name text,
  election_id INTEGER REFERENCES elections(id)
  )`;

export const db = new sqlite3.Database(DBSOURCE, (err: any) => {
  if (err) {
    console.log(err);
  } else {
    console.log("connected to db");
    // db.run(CREATE_USERS_TABLE);
    // db.run(CREATE_ELECTIONS_TABLE);
    // db.run(CREATE_USER_ELECTION_TABLE);
  }

  // db.run(CREATE_OPTIONS_TABLE);
});
