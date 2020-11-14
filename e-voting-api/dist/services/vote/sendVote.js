"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendVote = exports.registerVote = void 0;
const axios_1 = __importDefault(require("axios"));
const VoteRepo_1 = __importDefault(require("../../repository/implementation/VoteRepo"));
const ElectionsRepo_1 = __importDefault(require("../../repository/implementation/ElectionsRepo"));
const voteRepo = new VoteRepo_1.default();
const electionsRepo = new ElectionsRepo_1.default();
async function registerVote(req, res, next) {
    try {
        const { username, electionName } = req.body;
        if (username && electionName) {
            const response = await voteRepo.registerVote(username, electionName);
            if (response) {
                next();
            }
            else {
                res.status(403).send();
            }
        }
        else {
            res.status(406).send();
        }
    }
    catch (error) {
        console.log(error);
    }
}
exports.registerVote = registerVote;
async function sendVote(req, res, next) {
    const { electionName, vote } = req.body;
    const election = await electionsRepo.findByElectionName(electionName);
    console.log('election', election, 'vote', vote);
    if (election) {
        axios_1.default.post(`${election.server_url}/distribute`, vote).catch(error => {
            res.status(400).send();
        });
    }
    res.status(200).send();
}
exports.sendVote = sendVote;
//# sourceMappingURL=sendVote.js.map