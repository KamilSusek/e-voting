"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Database_1 = __importDefault(require("../../database/Database"));
class VoteRepo {
    async registerVote(username, electionName) {
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
        const matchingRow = votersWithElections.find(item => {
            if (item.election_id === election.id && item.voter_id === voter.id)
                return item;
        });
        console.log(matchingRow);
        // Alredy voted
        if (matchingRow.didVote) {
            return false;
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
            return true;
        }
    }
}
exports.default = VoteRepo;
//# sourceMappingURL=VoteRepo.js.map