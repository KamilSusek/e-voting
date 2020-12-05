"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Database_1 = __importDefault(require("../../database/Database"));
const BaseCandidateDTO_1 = __importDefault(require("../dtos/candidate/BaseCandidateDTO"));
class CandidateRepository {
    constructor() {
        this.db = Database_1.default.getInstance().getDatabase();
    }
    async findAll() {
        const dto = BaseCandidateDTO_1.default.dto;
        return await this.db.candidate.findMany({ select: dto });
    }
    async findByName(candidateName) {
        const dto = BaseCandidateDTO_1.default.dto;
        return await this.db.candidate.findFirst({
            where: {
                candidate_name: candidateName
            },
            select: dto
        });
    }
    async findByElectionId(electionId) {
        return await this.db.candidate.findMany({
            where: {
                id: electionId
            }
        });
    }
    async save(candidate, election) {
        await this.db.candidate.create({
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
    }
}
exports.default = CandidateRepository;
//# sourceMappingURL=CandidateRepository.js.map