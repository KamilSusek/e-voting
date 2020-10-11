"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEllectionsForUser = exports.getAllAssignedEllections = exports.assignUserToElection = exports.createElection = exports.getAllElections = exports.getElectionById = void 0;
const usersRepo_1 = require("../../repositories/usersRepo");
function getElectionById(req, res) {
    const select = "SELECT * FROM elections WHERE id = ?";
    const { id } = req.params;
    usersRepo_1.db.run(select, [id], (err, row) => {
        if (!err) {
            console.log(row);
            res.status(200).send(row);
        }
        else {
            console.log(err);
            res.status(400).send();
        }
    });
}
exports.getElectionById = getElectionById;
function getAllElections(req, res) {
    const select = "SELECT * FROM elections";
    usersRepo_1.db.all(select, (err, rows) => {
        if (!err) {
            console.log(rows);
            res.status(200).send(rows);
        }
        else {
            console.log(err);
            res.status(400).send();
        }
    });
}
exports.getAllElections = getAllElections;
function createElection(req, res) {
    const create = "INSERT INTO elections(electionTitle, description) VALUES(?, ?)";
    const { electionTitle, description } = req.body;
    usersRepo_1.db.run(create, [electionTitle, description], (err, result) => {
        if (!err) {
            console.log(result);
            res.status(200).send();
        }
        else {
            console.log(err);
            res.status(400).send();
        }
    });
}
exports.createElection = createElection;
function assignUserToElection(req, res) {
    const { username, electionTitle } = req.body;
    console.log(username, req.body);
    const getUserIdQuery = "SELECT id FROM users WHERE username = ?";
    const getElectionIdQuery = "SELECT id FROM elections WHERE electionTitle = ?";
    const assignQuery = "INSERT INTO user_election(user_id,election_id) VALUES(?, ?)";
    usersRepo_1.db.get(getUserIdQuery, [username], (err, row) => {
        if (!err) {
            const userId = row.id;
            usersRepo_1.db.get(getElectionIdQuery, [electionTitle], (err1, row1) => {
                if (!err1) {
                    const electionId = row1.id;
                    usersRepo_1.db.run(assignQuery, [userId, electionId], (err2) => {
                        if (!err2) {
                            res.status(200).send();
                        }
                        else {
                            res.status(400).send();
                        }
                    });
                }
                else {
                    res.status(400).send();
                }
            });
        }
        else {
            res.status(400).send();
        }
    });
}
exports.assignUserToElection = assignUserToElection;
function getAllAssignedEllections(req, res) {
    const getUserIdQuery = "SELECT * FROM user_election";
    usersRepo_1.db.all(getUserIdQuery, (err, rows) => {
        if (!err) {
            console.log(rows);
            res.status(200).send(rows);
        }
        else {
            res.status(400).send();
        }
    });
}
exports.getAllAssignedEllections = getAllAssignedEllections;
function getEllectionsForUser(req, res) {
    const selectUserIdQuery = "SELECT id FROM users WHERE username = ?";
    const { username } = req.params;
    const selectElectionsQuery = "SELECT * FROM elections WHERE id IN (SELECT election_id FROM user_election WHERE user_id = ?)";
    usersRepo_1.db.get(selectUserIdQuery, [username], (err, row) => {
        if (!err) {
            const id = row.id;
            usersRepo_1.db.all(selectElectionsQuery, [id], (err1, rows) => {
                if (!err1) {
                    res.status(200).send(rows);
                }
                else {
                    res.status(400).send();
                }
            });
        }
        else {
            res.status(400).send();
        }
    });
}
exports.getEllectionsForUser = getEllectionsForUser;
//# sourceMappingURL=elections.js.map