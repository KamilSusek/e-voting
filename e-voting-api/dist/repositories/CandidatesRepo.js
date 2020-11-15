"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Database_1 = __importDefault(require("..//database/Database"));
class CandidatesRepo {
    constructor() {
        this.db = Database_1.default.getInstance().getDatabase();
    }
    async findAll() {
        const array = await this.db.candidate.findMany({
            select: {
                candidate_name: true,
                candidate_description: true
            }
        });
        return array;
    }
    async findCandidatesByElectionName(name) {
        const election = await this.db.election.findOne({
            where: {
                election_name: name
            }
        });
        const candidates = await this.db.candidate.findMany({
            where: {
                election_id: election.id
            }
        });
        return candidates;
    }
    //   public async save(candidate: CandidateDTO) {}
    async saveCandidateToElection(candidate, electionName) {
        const election = await this.db.election.findOne({
            where: {
                election_name: electionName
            }
        });
        if (election && candidate) {
            const response = await this.db.candidate.create({
                data: {
                    candidate_name: candidate.candidate_name,
                    candidate_description: candidate.candidate_description,
                    Election: {
                        connect: {
                            id: election.id
                        }
                    }
                }
            });
            return response;
        }
        else {
            throw new Error();
        }
    }
}
exports.default = CandidatesRepo;
//# sourceMappingURL=CandidatesRepo.js.map