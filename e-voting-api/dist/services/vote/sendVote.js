"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendVote = exports.registerVote = exports.validate = void 0;
const axios_1 = __importDefault(require("axios"));
const Database_1 = __importDefault(require("../../database/Database"));
const ElectionsRepo_1 = __importDefault(require("../../repositories/ElectionsRepo"));
const electionsRepo = new ElectionsRepo_1.default();
async function validate(req, res, next) {
    try {
        const { username, electionName } = req.body;
        if (username && electionName) {
            next();
        }
        else {
            res.status(406).send();
        }
    }
    catch (error) {
        console.log(error);
    }
}
exports.validate = validate;
async function registerVote(req, res, next) {
    try {
        const { username, electionName } = req.body;
        const db = Database_1.default.getInstance().getDatabase();
        const voter = await db.voter.findOne({
            where: {
                username
            }
        });
        const election = await db.election.findOne({
            where: {
                election_name: electionName
            }
        });
        const votersWithElections = await db.user_Election.findMany();
        const matchingRow = votersWithElections.find((item) => {
            if (item.election_id === election.id && item.voter_id === voter.id)
                return item;
        });
        console.log(matchingRow);
        // Alredy voted
        if (matchingRow.didVote) {
            res.status(403).send();
        }
        else {
            await db.user_Election.update({
                where: {
                    id: matchingRow.id
                },
                data: {
                    didVote: true
                }
            });
            next();
        }
    }
    catch (error) {
        res.status(406).send();
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