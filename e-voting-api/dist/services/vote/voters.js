"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findVoterAttachedToElection = exports.findVoterFromParams = exports.findAllVoters = exports.login = void 0;
const VotersRepo_1 = __importDefault(require("../../repository/implementation/VotersRepo"));
const voters = new VotersRepo_1.default();
async function login(req, res, next) {
    try {
        const { username, password } = req.body;
        const response = await voters.findByUsername(username);
        if (response.password === password) {
            res.send();
        }
        else {
            res.status(403).send();
        }
    }
    catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
}
exports.login = login;
async function findAllVoters(req, res, next) {
    try {
        const response = await voters.findAll();
        res.status(200).send(response);
    }
    catch (error) {
        console.log(error);
        res.status(404).send(error);
    }
}
exports.findAllVoters = findAllVoters;
async function findVoterFromParams(req, res, next) {
    try {
        const { username } = req.params;
        const response = await voters.findByUsername(username);
        res.send(response);
    }
    catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
}
exports.findVoterFromParams = findVoterFromParams;
async function findVoterAttachedToElection(req, res, next) {
    try {
        const { electionName } = req.params;
        const response = await voters.findVoterByElection(electionName);
        res.send(response);
    }
    catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
}
exports.findVoterAttachedToElection = findVoterAttachedToElection;
//# sourceMappingURL=voters.js.map