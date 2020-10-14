"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOptionsForElection = exports.getElectionsForUser = exports.getAllAssignedEllections = exports.assignUserToElection = exports.createElection = exports.findAll = exports.findById = void 0;
const database_1 = require("../../database/database");
function findById(id) {
    return new Promise((resolve, reject) => {
        const select = "SELECT * FROM elections WHERE id = ?";
        database_1.db.get(select, [id], (err, row) => {
            if (!err) {
                return resolve(row);
            }
            else {
                return reject(err);
            }
        });
    });
}
exports.findById = findById;
function findAll() {
    return new Promise((resolve, reject) => {
        const select = "SELECT * FROM elections";
        database_1.db.all(select, (err, rows) => {
            if (!err) {
                return resolve(rows);
            }
            else {
                return reject(err);
            }
        });
    });
}
exports.findAll = findAll;
function createElection(req, res) {
    const create = "INSERT INTO elections(electionTitle, description) VALUES(?, ?)";
    const { electionTitle, description } = req.body;
    database_1.db.run(create, [electionTitle, description], (err, result) => {
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
    database_1.db.get(getUserIdQuery, [username], (err, row) => {
        if (!err) {
            const userId = row.id;
            database_1.db.get(getElectionIdQuery, [electionTitle], (err1, row1) => {
                if (!err1) {
                    const electionId = row1.id;
                    database_1.db.run(assignQuery, [userId, electionId], (err2) => {
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
    database_1.db.all(getUserIdQuery, (err, rows) => {
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
function getElectionsForUser(req, res) {
    const selectUserIdQuery = "SELECT id FROM users WHERE username = ?";
    const { username } = req.params;
    const selectElectionsQuery = "SELECT * FROM elections WHERE id IN (SELECT election_id FROM user_election WHERE user_id = ?)";
    database_1.db.get(selectUserIdQuery, [username], (err, row) => {
        if (!err) {
            const id = row.id;
            database_1.db.all(selectElectionsQuery, [id], (err1, rows) => {
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
exports.getElectionsForUser = getElectionsForUser;
function getOptionsForElection(req, res) {
    const select = "SELECT optionName FROM vote_option WHERE election_id IN (SELECT election_id FROM elections WHERE electionTitle = ?)";
    const { title } = req.params;
    database_1.db.all(select, [title], (err, rows) => {
        if (!err) {
            console.log(rows);
            res.status(200).send(rows);
        }
        else {
            res.status(400).send();
        }
    });
}
exports.getOptionsForElection = getOptionsForElection;
//# sourceMappingURL=elections.js.map