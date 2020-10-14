import sqlite3 from "sqlite3";
const DBSOURCE = "db.sqlite";
export const db = new sqlite3.Database(DBSOURCE, (err: any) => {
  if (err) {
    console.log(err);
  } else {
    console.log("connected to db");
  }
});
