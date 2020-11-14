"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Database_1 = __importDefault(require("./Database"));
class CandidatesRepo {
    async findAll() {
        const db = Database_1.default.getInstance().getDatabase();
        const array = db.candidate.findMany({
            select: {
                candidate_name: true,
                candidate_description: true,
            },
        });
    }
    //   async findByName(name: string) {}
    //   public async save(candidate: CandidateDTO) {}
    async saveCandidateToElection(candidate, electionName) {
        const db = Database_1.default.getInstance().getDatabase();
        const election = await db.election.findOne({
            where: {
                election_name: electionName,
            },
        });
        if (election && candidate) {
            const response = await db.candidate.create({
                data: {
                    candidate_name: candidate.candidate_name,
                    candidate_description: candidate.candidate_description,
                    Election: {
                        connect: {
                            id: election.id,
                        },
                    },
                },
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