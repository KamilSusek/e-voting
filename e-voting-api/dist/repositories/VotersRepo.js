"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Database_1 = __importDefault(require("../database/Database"));
class VotersRepo {
    async findAll() {
        const db = Database_1.default.getInstance().getDatabase();
        const array = await db.voter.findMany({
            select: { username: true, password: true }
        });
        return array;
    }
    async findByUsername(username) {
        const db = Database_1.default.getInstance().getDatabase();
        const value = await db.voter.findOne({
            where: {
                username
            }
        });
        return value;
    }
    async findVoterByElection(electionName) {
        const db = Database_1.default.getInstance().getDatabase();
        const election = await db.election.findOne({
            where: {
                election_name: electionName
            }
        });
        const voters = await db.user_Election.findMany({
            where: {
                election_id: election.id
            },
            select: {
                Voter: {
                    select: {
                        username: true
                    }
                }
            }
        });
        const votersDTO = [];
        voters.forEach((item) => {
            const { username } = item.Voter;
            votersDTO.push({ username });
        });
        return votersDTO;
    }
    //   findById() {}
    async save(voter) {
        const db = Database_1.default.getInstance().getDatabase();
        const response = await db.voter.create({ data: voter });
        return response;
    }
}
exports.default = VotersRepo;
//# sourceMappingURL=VotersRepo.js.map