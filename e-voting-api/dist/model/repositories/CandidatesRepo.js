"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CandidateRepository_1 = __importDefault(require("./crud/CandidateRepository"));
const ElectionRepository_1 = __importDefault(require("./crud/ElectionRepository"));
class CandidatesRepo {
    constructor() {
        this.candidateRepository = new CandidateRepository_1.default();
        this.electionRepository = new ElectionRepository_1.default();
    }
    async findAll() {
        return await this.candidateRepository.findAll();
    }
    async findCandidatesByElectionName(electionName) {
        const election = await this.electionRepository.findByElectionName(electionName);
        const candidates = await this.candidateRepository.findByElectionId(election.id);
        return candidates;
    }
    async saveCandidateToElection(candidate, electionName) {
        const election = await this.electionRepository.findByElectionName(electionName);
        if (election && candidate) {
            const response = await this.candidateRepository.save(candidate, election);
            return response;
        }
        else {
            throw new Error();
        }
    }
}
exports.default = CandidatesRepo;
//# sourceMappingURL=CandidatesRepo.js.map