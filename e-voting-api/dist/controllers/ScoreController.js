"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const CandidatesRepo_1 = __importDefault(require("../repositories/CandidatesRepo"));
const ElectionsRepo_1 = __importDefault(require("../repositories/ElectionsRepo"));
const Database_1 = __importDefault(require("../database/Database"));
class ScoreController {
    constructor() {
        this.electionsRepository = new ElectionsRepo_1.default();
        this.candidatesRepo = new CandidatesRepo_1.default();
    }
    async findElectionFromParams(req, res, next) {
        try {
            const { electionName } = req.params;
            const election = await this.electionsRepository.findByElectionName(electionName);
            if (election) {
                req.body.electionName = electionName;
                req.body.election = election;
                next();
            }
            else {
                res.status(401).send();
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    async prepareScores(req, res, next) {
        const { election, electionName } = req.body;
        const response = await axios_1.default.get(`${election.server_url}/score`);
        const candidates = await this.candidatesRepo.findCandidatesByElectionName(electionName);
        if (response.data && candidates) {
            req.body.scores = response.data;
            req.body.candidates = candidates;
            next();
        }
        else {
            res.status(401).send();
        }
    }
    async calculateScore(req, res, next) {
        const { scores, candidates } = req.body;
        const scoresArray = scores;
        const countedVotes = new Array();
        candidates.forEach(({ candidate_name }) => {
            const matchingVotes = scoresArray.filter((item) => item === candidate_name);
            const voteCounter = matchingVotes.length;
            countedVotes.push({ candidate_name, voteCounter });
        });
        console.log(countedVotes);
        res.status(200).send(countedVotes);
    }
    async countVotes(req, res, next) {
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
}
exports.default = ScoreController;
//# sourceMappingURL=ScoreController.js.map