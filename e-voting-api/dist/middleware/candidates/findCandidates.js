"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCandidateElection = exports.getAllCandidates = void 0;
const Database_1 = __importDefault(require("../../model/database/Database"));
async function getAllCandidates(req, res, next) {
    try {
        const db = Database_1.default.getInstance().getDatabase();
        const candidates = await db.candidate.findMany();
        res.send(candidates);
    }
    catch (error) {
        res.status(400).send();
    }
}
exports.getAllCandidates = getAllCandidates;
async function getCandidateElection(req, res, next) {
    try {
        const { electionName } = req.params;
        const db = Database_1.default.getInstance().getDatabase();
        const election = await db.election.findOne({
            where: {
                election_name: electionName
            }
        });
        if (election) {
            const candidates = await db.candidate.findMany({
                where: {
                    election_id: election.id
                },
                select: {
                    candidate_name: true,
                    candidate_description: true,
                    votes: true
                }
            });
            res.send(candidates);
        }
        else {
            res.status(404).send();
        }
    }
    catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
}
exports.getCandidateElection = getCandidateElection;
//# sourceMappingURL=findCandidates.js.map