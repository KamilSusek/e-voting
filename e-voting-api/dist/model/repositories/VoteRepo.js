"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Database_1 = __importDefault(require("../database/Database"));
const CandidateRepository_1 = __importDefault(require("./crud/CandidateRepository"));
const ElectionRepository_1 = __importDefault(require("./crud/ElectionRepository"));
const VoterRepository_1 = __importDefault(require("./crud/VoterRepository"));
const VoterElectionRepository_1 = __importDefault(require("./crud/VoterElectionRepository"));
class VoteRepo {
    constructor() {
        this.candidateRepository = new CandidateRepository_1.default();
        this.electionRepository = new ElectionRepository_1.default();
        this.voterRepository = new VoterRepository_1.default();
        this.voterElectionRepository = new VoterElectionRepository_1.default();
    }
    async registerVote(username, electionName) {
        const db = Database_1.default.getInstance().getDatabase();
        const voter = await this.voterRepository.findByUsername(username);
        const election = await this.electionRepository.findByElectionName(electionName);
        const votersWithElections = await this.voterElectionRepository.findAll();
        const matchingRow = votersWithElections.find((item) => {
            if (item.election_id === election.id && item.voter_id === voter.id)
                return item;
        });
        console.log(matchingRow);
        // Alredy voted
        if (matchingRow.didVote) {
            return false;
        }
        else {
            // TODO ADD UPDATE METHOD TO VOTE REPOSITORY
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