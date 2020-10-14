"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllElections = exports.getElectionById = void 0;
const elections_1 = require("../repos/elections");
function getElectionById(req, res) {
    const { id } = req.params;
    return elections_1.findById(id)
        .then((response) => {
        console.log(response);
        res.send("ok");
    })
        .catch((err) => {
        console.log(err);
        res.status(400).send("ok");
    });
}
exports.getElectionById = getElectionById;
function getAllElections(req, res) {
    return elections_1.findAll()
        .then((response) => {
        res.status(200).send(response);
    })
        .catch((err) => {
        res.status(400).send();
    });
}
exports.getAllElections = getAllElections;
//# sourceMappingURL=electionsService.js.map