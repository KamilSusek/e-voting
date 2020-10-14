import { db } from "../../database/database";

export function findById(id: number) {
  return new Promise((resolve, reject) => {
    const select = "SELECT * FROM elections WHERE id = ?";
    db.get(select, [id], (err: any, row: any) => {
      if (!err) {
        return resolve(row);
      } else {
        return reject(err);
      }
    });
  });
}

export function findAll() {
  return new Promise((resolve, reject) => {
    const select = "SELECT * FROM elections";

    db.all(select, (err: any, rows: any) => {
      if (!err) {
        return resolve(rows);
      } else {
        return reject(err);
      }
    });
  });
}

export function createElection(req: any, res: any) {
  const create =
    "INSERT INTO elections(electionTitle, description) VALUES(?, ?)";
  const { electionTitle, description } = req.body;

  db.run(create, [electionTitle, description], (err: any, result: any) => {
    if (!err) {
      console.log(result);
      res.status(200).send();
    } else {
      console.log(err);
      res.status(400).send();
    }
  });
}

export function assignUserToElection(req: any, res: any) {
  const { username, electionTitle } = req.body;
  console.log(username, req.body);

  const getUserIdQuery = "SELECT id FROM users WHERE username = ?";
  const getElectionIdQuery = "SELECT id FROM elections WHERE electionTitle = ?";
  const assignQuery =
    "INSERT INTO user_election(user_id,election_id) VALUES(?, ?)";

  db.get(getUserIdQuery, [username], (err: any, row: any) => {
    if (!err) {
      const userId = row.id;
      db.get(getElectionIdQuery, [electionTitle], (err1: any, row1: any) => {
        if (!err1) {
          const electionId = row1.id;
          db.run(assignQuery, [userId, electionId], (err2) => {
            if (!err2) {
              res.status(200).send();
            } else {
              res.status(400).send();
            }
          });
        } else {
          res.status(400).send();
        }
      });
    } else {
      res.status(400).send();
    }
  });
}

export function getAllAssignedEllections(req: any, res: any) {
  const getUserIdQuery = "SELECT * FROM user_election";

  db.all(getUserIdQuery, (err: any, rows: any) => {
    if (!err) {
      console.log(rows);
      res.status(200).send(rows);
    } else {
      res.status(400).send();
    }
  });
}

export function getElectionsForUser(req: any, res: any) {
  const selectUserIdQuery = "SELECT id FROM users WHERE username = ?";

  const { username } = req.params;

  const selectElectionsQuery =
    "SELECT * FROM elections WHERE id IN (SELECT election_id FROM user_election WHERE user_id = ?)";

  db.get(selectUserIdQuery, [username], (err, row) => {
    if (!err) {
      const id = row.id;
      db.all(selectElectionsQuery, [id], (err1, rows) => {
        if (!err1) {
          res.status(200).send(rows);
        } else {
          res.status(400).send();
        }
      });
    } else {
      res.status(400).send();
    }
  });
}

export function getOptionsForElection(req: any, res: any) {
  const select =
    "SELECT optionName FROM vote_option WHERE election_id IN (SELECT election_id FROM elections WHERE electionTitle = ?)";
  const { title } = req.params;
  db.all(select, [title], (err, rows) => {
    if (!err) {
      console.log(rows);
      res.status(200).send(rows);
    } else {
      res.status(400).send();
    }
  });
}
