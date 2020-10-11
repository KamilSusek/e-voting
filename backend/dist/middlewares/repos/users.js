"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserById = exports.getUserByUsername = exports.getById = exports.getAllUsers = exports.createUsers = void 0;
const usersRepo_1 = require("../../repositories/usersRepo");
function createUsers(req, res) {
    const insert = "INSERT INTO users (username,  password) VALUES (?,?)";
    const { username, password } = req.body;
    usersRepo_1.db.run(insert, [username, password], (err, result) => {
        if (!err) {
            console.log(result);
            res.status(200).send();
        }
        else {
            console.log(err);
            res.status(401).send();
        }
    });
}
exports.createUsers = createUsers;
function getAllUsers(req, res) {
    const select = "SELECT username FROM users";
    usersRepo_1.db.all(select, (err, rows) => {
        if (!err) {
            console.log(rows);
            res.status(200).send(rows);
        }
        else {
            console.log(err);
            res.status(401).send();
        }
    });
}
exports.getAllUsers = getAllUsers;
function getById(req, res) {
    const select = "SELECT username FROM users WHERE id = ?";
    const { id } = req.params;
    usersRepo_1.db.get(select, [id], (err, row) => {
        if (!err) {
            console.log(row);
            res.status(200).send(row);
        }
        else {
            console.log(err);
            res.status(401).send();
        }
    });
}
exports.getById = getById;
function getUserByUsername(req, res) {
    const select = "SELECT username FROM users WHERE username = ?";
    const { username } = req.params;
    usersRepo_1.db.get(select, [username], (err, row) => {
        if (!err) {
            console.log(row);
            res.status(200).send(row);
        }
        else {
            console.log(err);
            res.status(401).send();
        }
    });
}
exports.getUserByUsername = getUserByUsername;
function deleteUserById(req, res) {
    const deleteStmt = "DELETE FROM users WHERE id = ?";
    const { id } = req.body;
    usersRepo_1.db.run(deleteStmt, [id], (err, result) => {
        if (!err) {
            console.log(result);
            res.status(200).send();
        }
        else {
            console.log(err);
            res.status(401).send();
        }
    });
}
exports.deleteUserById = deleteUserById;
//# sourceMappingURL=users.js.map