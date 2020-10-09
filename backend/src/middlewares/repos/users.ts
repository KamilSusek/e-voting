import { db } from "../../repositories/usersRepo";

export function createUsers(req: any, res: any) {
  const insert = "INSERT INTO users (username,  password) VALUES (?,?)";
  const { username, password } = req.body;

  db.run(insert, [username, password], (err: any, result: any) => {
    if (!err) {
      console.log(result);
      res.status(200).send();
    } else {
      console.log(err);
      res.status(401).send();
    }
  });
}

export function getAllUsers(req: any, res: any) {
  const select = "SELECT username FROM users";

  db.all(select, (err, rows) => {
    if (!err) {
      console.log(rows);
      res.status(200).send(rows);
    } else {
      console.log(err);
      res.status(401).send();
    }
  });
}

export function getById(req: any, res: any) {
  const select = "SELECT username FROM users WHERE id = ?";
  const { id } = req.params;

  db.get(select, [id], (err: any, row: any) => {
    if (!err) {
      console.log(row);
      res.status(200).send(row);
    } else {
      console.log(err);
      res.status(401).send();
    }
  });
}

export function getUserByUsername(req: any, res: any) {
  const select = "SELECT username FROM users WHERE username = ?";
  const { username } = req.params;

  db.get(select, [username], (err, row) => {
    if (!err) {
      console.log(row);
      res.status(200).send(row);
    } else {
      console.log(err);
      res.status(401).send();
    }
  });
}

export function deleteUserById(req: any, res: any) {
  const deleteStmt = "DELETE FROM users WHERE id = ?";
  const { id } = req.body;
  db.run(deleteStmt, [id], (err: any, result: any) => {
    if (!err) {
      console.log(result);
      res.status(200).send();
    } else {
      console.log(err);
      res.status(401).send();
    }
  });
}
