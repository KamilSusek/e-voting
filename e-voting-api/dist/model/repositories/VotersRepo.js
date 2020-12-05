"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ElectionRepository_1 = __importDefault(require("./crud/ElectionRepository"));
const VoterElectionRepository_1 = __importDefault(require("./crud/VoterElectionRepository"));
const VoterRepository_1 = __importDefault(require("./crud/VoterRepository"));
class VotersRepo {
    constructor() {
        this.voterRepository = new VoterRepository_1.default();
        this.electionRepository = new ElectionRepository_1.default();
        this.voterElectionRepository = new VoterElectionRepository_1.default();
    }
    async findAll() {
        const voters = await this.voterRepository.findAll();
        return voters;
    }
    async findByUsername(username) {
        const value = await this.voterRepository.findByUsername(username);
        return value;
    }
    async findVoterByElection(electionName) {
        const election = await this.electionRepository.findByElectionName(electionName);
        const voters = await this.voterElectionRepository.findManyByElectionId(election.id);
        const votersDTO = [];
        voters.forEach((item) => {
            const { username } = item.Voter;
            votersDTO.push({ username });
        });
        return votersDTO;
    }
    async save(voter) {
        const response = await this.voterRepository.save(voter);
        return response;
    }
}
exports.default = VotersRepo;
//# sourceMappingURL=VotersRepo.js.map