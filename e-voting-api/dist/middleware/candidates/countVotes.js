"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.countVotes = void 0;
const Database_1 = __importDefault(require("../../model/database/Database"));
async function countVotes(req, res, next) {
    try {
        const { electionName } = req.params;
        const db = Database_1.default.getInstance().getDatabase();
        const election = await db.election.findOne({
            where: { election_name: electionName }
        });
        if (election.is_published === true) {
            const candidates = await db.candidate.findMany({
                where: { election_id: election.id },
                select: {
                    candidate_name: true,
                    votes: true
                }
            });
            res.send(candidates);
        }
        else {
            res.status(406).send();
        }
    }
    catch (error) {
        res.status(400).send();
    }
}
exports.countVotes = countVotes;
//# sourceMappingURL=countVotes.js.map